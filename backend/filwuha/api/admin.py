from flask import jsonify, request, abort
from flask import Blueprint
from filwuha.api.utils import generate_token
from filwuha.models import Order
from filwuha.models import Admin
from filwuha.models import db


admin_bp = Blueprint("admin", __name__, url_prefix="/api/v1")


@admin_bp.route("/admin/orders", strict_slashes=False)
def get_orders():
    try:
        orders_obj = Order.query.all()
        serialized_orders = [order.serialize() for order in orders_obj]
        return jsonify(Orders=serialized_orders)
    except Exception as e:
        return jsonify(Error=str(e)), 404


@admin_bp.route("/admin/orders/<id>", strict_slashes=False)
def get_order(id):
    order_obj = Order.query.get(id)
    if not order_obj:
        return jsonify(Error="Order not found"), 404
    try:
        serialized_order = order_obj.serialize()
        return jsonify(Order=serialized_order)
    except Exception as e:
        return jsonify(Error=str(e)), 404


@admin_bp.route("/admin/orders/<id>", methods=["DELETE"], strict_slashes=False)
def delete_order(id):
    order_obj = Order.query.get(id)
    if not order_obj:
        return jsonify(Error="Order not found"), 404
    try:
        db.session.delete(order_obj)
        db.session.commit()
        return jsonify({"message": "Order successfully deleted"}), 200
    except Exception as e:
        return jsonify(Error=str(e)), 404


def validate_request(required_fields):
    data = request.get_json()
    if not data:
        abort(400, description="No input data provided")
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(400, description=f"Missing fields: {', '.join(missing_fields)}")
    return data


@admin_bp.route("/admin/login", methods=["POST"], strict_slashes=False)
def login():
    try:
        required_fields = ["username", "password"]
        data = validate_request(required_fields)
        admin_obj = Admin.query.filter_by(username=data["username"]).first()
        if not admin_obj or not admin_obj.check_password(data["password"]):
            return jsonify({"message": "Invalid username or password"}), 404
        admin_data = {
            "id": admin_obj.admin_id,
            "username": admin_obj.username,
            "email": admin_obj.created_at.isoformat() if admin_obj.created_at else None,
        }
        token = generate_token(admin_data)
        return jsonify({"token": token, "message": "Admin login successful"}), 200
    except Exception as e:
        return jsonify(str(e)), 404


@admin_bp.route("/admin/orders/<id>", methods=["PUT"], strict_slashes=False)
def update_order(id):
    try:
        data = request.get_json()
        order_obj = Order.query.get(id)
        order_obj.first_name = data["first_name"]
        order_obj.last_name = data["last_name"]
        order_obj.email = data["email"]
        order_obj.phone_number = data["phone_number"]
        order_obj.order_date = data["order_date"]
        order_obj.order_time = data["order_time"]
        order_obj.price = data["price"]
        order_obj.payment = data["payment"]
        db.session.commit()
        return jsonify({"message": "Order successfully updated"}), 200
    except Exception as e:
        return jsonify(Error=str(e)), 404
