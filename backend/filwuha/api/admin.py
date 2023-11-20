from flask import jsonify, request, abort
from flask import Blueprint
from flask_login import login_user
from filwuha.models import Order
from filwuha.models import Admin

admin_bp = Blueprint("admin", __name__, url_prefix="/api/v1")

def validate_request(required_fields):
    data = request.get_json()
    if not data:
        abort(400, description="No input data provided")
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(400, description=f"Missing fields: {', '.join(missing_fields)}")
    return data

@admin_bp.route("/admin/orders")
def get_orders():
    try:
        orders_obj = Order.query.all()
        serialized_orders = [order.serialize() for order in orders_obj]
        return jsonify(Orders=serialized_orders)
    except Exception as e:
        return jsonify(Error=str(e)), 404


@admin_bp.route("/admin/orders/<id>")
def get_order(id):
    try:
        order_obj = Order.query.get(id)
        serialized_order = order_obj.serialize()
        return jsonify(Order=serialized_order)
    except Exception as e:
        return jsonify(Error=str(e)), 404


@admin_bp.route("/admin/orders/<id>", methods=["DELETE"])
def delete_order(id):
    try:
        order_obj = Order.query.get(id)
        order_obj.delete()
        return jsonify({"message": "Order successfully deleted"})
    except Exception as e:
        return jsonify(Error=str(e)), 404

@admin_bp.route("/admin/login", methods=["POST"], strict_slashes=False)
def login():
    required_fields = ["username", "password_hash"]
    data = validate_request(required_fields)
    admin_obj = Admin.query.filter_by(username=data["username"]).first()
    if not admin_obj or not admin_obj.check_password(data["password"]):
        abort(401, description="Invalid username or password")
    login_user(admin_obj)
    return jsonify(admin_obj.serilaize()), 200

@admin_bp.route("/admin/orders/<id>", methods=["PUT"], strict_slashes=False)
def update_order(id):
    required_fields = ["first_name", "last_name", "phone_number", "order_date", "order_time", "price", "payment"]
    data = validate_request(required_fields)
    order_obj = Order.query.get(id)
    order_obj.first_name = data["first_name"]
    order_obj.last_name = data["last_name"]
    order_obj.phone_number = data["phone_number"]
    order_obj.order_date = data["order_date"]
    order_obj.order_time = data["order_time"]
    order_obj.price = data["price"]
    order_obj.payment = data["payment"]
    order_obj.update()
    return jsonify(order_obj.serialize()), 200