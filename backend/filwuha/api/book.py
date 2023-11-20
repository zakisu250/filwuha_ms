from flask import Blueprint, request, abort, jsonify
from filwuha.models import Order
from filwuha.models import db

book_bp = Blueprint("book", __name__, url_prefix="/api/v1")

@book_bp.route("/book", methods=["POST"], strict_slashes=False)
def create_book():
    if not request.get_json():
        abort(400, description="No input data provided")
    if "first_name"  not in request.get_json():
        abort(400, description="Missing first_name data")
    if "last_name" not in request.get_json():
        abort(400, description="Missing last_name data")
    if "phone_number" not in request.get_json():
        abort(400, description="Missing phone_number data")
    if "order_date" not in request.get_json():
        abort(400, description="Missing order_date data")
    if "order_time" not in request.get_json():
        abort(400, description="Missing order_time data")
    if "price" not in request.get_json():
        abort(400, description="Missing price data")
    if "payment" not in request.get_json():
        abort(400, description="Missing payment data")
    try:
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
        db.session.add(new_book)
        db.session.commit()
        return jsonify(new_book.serialize()), 201
    except Exception as e:
        abort(500, description=str(e))
