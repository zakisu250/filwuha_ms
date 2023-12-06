from flask import Blueprint, request, abort, jsonify
from filwuha.models import Order
from filwuha.models import db
from datetime import date, timedelta

book_bp = Blueprint("book", __name__, url_prefix="/api/v1")


@book_bp.route("/reserved_slots", methods=["GET"], strict_slashes=False)
def get_reserved_slots():
    booked_slots = (
        db.session.query(Order.order_date, Order.order_time, Order.slot_number)
        .order_by(Order.order_date)
        .all()
    )

    grouped_slots = {}
    for slot in booked_slots:
        date_str = slot[0].isoformat()
        if date_str not in grouped_slots:
            grouped_slots[date_str] = []
        grouped_slots[date_str].append({"time": slot[1].isoformat(), "slot": slot[2]})

    return jsonify(grouped_slots), 200


@book_bp.route("/book", methods=["POST"], strict_slashes=False)
def create_book():
    if not request.get_json():
        abort(400, description="No input data provided")
    if "first_name" not in request.get_json():
        abort(400, description="Missing first_name")
    if "last_name" not in request.get_json():
        abort(400, description="Missing last_name")
    if "phone_number" not in request.get_json():
        abort(400, description="Missing phone_number")
    if "order_date" not in request.get_json():
        abort(400, description="Missing order_date")
    if "order_time" not in request.get_json():
        abort(400, description="Missing order_time")
    if "slot_number" not in request.get_json():
        abort(400, description="Missing slot_number")
    if "price" not in request.get_json():
        abort(400, description="Missing price")
    if "payment" not in request.get_json():
        abort(400, description="Missing payment")
    try:
        data = request.get_json()
        order = Order.query.filter_by(phone_number=data["phone_number"]).first()
        if order and not order.payment:
            return jsonify({"message": "Order already exist"}), 402
        new_book = Order(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            order_date=data["order_date"],
            order_time=data["order_time"],
            slot_number=data["slot_number"],
            price=data["price"],
            payment=data["payment"],
        )
        db.session.add(new_book)
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Order successful, proceed to payment",
                    "order_id": new_book.order_id,
                    "payment": False,
                }
            ),
            201,
        )
    except Exception as e:
        abort(500, description=str(e))


@book_bp.route("/book/<id>", methods=["GET"], strict_slashes=False)
def get_book(id):
    book_obj = Order.query.get(id)
    if not book_obj:
        abort(404, description="Order not found")
    try:
        if not book_obj.payment:
            return jsonify({"message": "Payment not Successful"}), 402
        else:
            return (
                jsonify({"message": "Order successfully booked"}),
                200,
            )
    except Exception as e:
        abort(500, description=str(e))
