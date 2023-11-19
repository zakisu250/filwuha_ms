from flask import jsonify
from flask import Blueprint
from filwuha.models import Order

admin_bp = Blueprint("admin", __name__, url_prefix="/api/v1")


@admin_bp.route("/admin/login", methods=["POST"])
def admin_login():
    return True


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
