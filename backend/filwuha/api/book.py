from flask import Blueprint, request, abort, jsonify
from filwuha.models import Order

book_bp = Blueprint("book", __name__, url_prefix="/api/v1")

@book_bp.route("/book", methods=["POST"], strict_slashes=False)
def create_book():
    try:
        if not request.get_json():
            abort(400, description="No input data provided")
        if "user_name" or "last_name" or "phone_number" or "order_date" or "order_time" or "price" or "payment" not in request.get_json():
            abort(400, description="Missing input data")
        data = request.get_json()
        new_book = Order(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            order_date=data["order_date"],
            order_time=data["order_time"],
            price=data["price"],
            payment=data["payment"],
        )
        return jsonify(new_book.serialize()), 201
    except Exception as e:
        abort(500, description=str(e))
