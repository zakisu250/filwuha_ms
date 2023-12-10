from flask import jsonify, request, abort
from flask import Blueprint
from filwuha import bcrypt
from filwuha.api.utils import generate_token, validate_request
from filwuha.models import Order
from filwuha.models import Admin
from filwuha.models import db


admin_bp = Blueprint("admin", __name__, url_prefix="/api/v1")


@admin_bp.route("/admin/orders", strict_slashes=False)
def get_orders():
    try:
        # Query all orders from the database
        orders_obj = Order.query.all()

        # Serialize each order object into a dictionary
        serialized_orders = [order.serialize() for order in orders_obj]

        # Return the serialized orders as a JSON response
        return jsonify(Orders=serialized_orders)

    except Exception as e:
        # If an error occurs, return the error message as a JSON response with a 400 status code
        return jsonify(Error=str(e)), 400


@admin_bp.route("/admin/orders/<id>", strict_slashes=False)
def get_order(id):
    # Query the database for an order with the provided id
    order_obj = Order.query.get(id)

    # If no order is found, return an error message with a 404 status code
    if not order_obj:
        return jsonify(Error="Order not found"), 404

    try:
        # Serialize the order object into a dictionary
        serialized_order = order_obj.serialize()

        # Return the serialized order as a JSON response
        return jsonify(Order=serialized_order)

    except Exception as e:
        # If an error occurs during serialization, return the error message as a JSON response with a 404 status code
        return jsonify(Error=str(e)), 404


@admin_bp.route("/admin/orders/<id>", methods=["DELETE"], strict_slashes=False)
def delete_order(id):
    # Query the database for an order with the provided id
    order_obj = Order.query.get(id)

    # If no order is found, return an error message with a 404 status code
    if not order_obj:
        return jsonify(Error="Order not found"), 404

    try:
        # Delete the order object from the database
        db.session.delete(order_obj)

        # Commit the changes to the database
        db.session.commit()

        # Return a success message as a JSON response with a 200 status code
        return jsonify({"message": "Order successfully deleted"}), 200

    except Exception as e:
        # If an error occurs during deletion, return the error message as a JSON response with a 404 status code
        return jsonify(Error=str(e)), 404


@admin_bp.route("/admin/login", methods=["POST"], strict_slashes=False)
def login():
    try:
        # Define the required fields for the request
        required_fields = ["username", "password"]

        # Validate the request data
        data = validate_request(required_fields)

        # Query the database for an admin with the provided username
        admin_obj = Admin.query.filter_by(username=data["username"]).first()

        # If no admin is found or the provided password does not match the hashed password in the database, return an error message
        if not admin_obj or not bcrypt.check_password_hash(
            admin_obj.password_hash, data["password"]
        ):
            return jsonify({"message": "Invalid username or password"}), 404

        # Create a dictionary with the admin's data
        admin_data = {
            "id": admin_obj.admin_id,
            "username": admin_obj.username,
            "email": admin_obj.created_at.isoformat() if admin_obj.created_at else None,
        }

        # Generate a JWT for the admin
        token = generate_token(admin_data)

        # Return the JWT and a success message as a JSON response
        return jsonify({"token": token, "message": "Admin login successful"}), 200

    except Exception as e:
        # If an error occurs, return the error message as a JSON response with a 404 status code
        return jsonify(str(e)), 404


@admin_bp.route("/admin/orders/<id>", methods=["PUT"], strict_slashes=False)
def update_order(id):
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Query the database for an order with the provided id
        order_obj = Order.query.get(id)

        # Update the order object's attributes with the data from the request
        order_obj.first_name = data["first_name"]
        order_obj.last_name = data["last_name"]
        order_obj.email = data["email"]
        order_obj.phone_number = data["phone_number"]
        order_obj.order_date = data["order_date"]
        order_obj.order_time = data["order_time"]
        order_obj.price = data["price"]
        order_obj.payment = data["payment"]

        # Commit the changes to the database
        db.session.commit()

        # Return a success message as a JSON response with a 200 status code
        return jsonify({"message": "Order successfully updated"}), 200

    except Exception as e:
        # If an error occurs during update, return the error message as a JSON response with a 404 status code
        return jsonify(Error=str(e)), 404
