from flask import Blueprint, request, abort, jsonify
from filwuha.models import Order
from filwuha.models import db
from datetime import date, timedelta

book_bp = Blueprint("book", __name__, url_prefix="/api/v1")


@book_bp.route("/reserved_slots", methods=["GET"], strict_slashes=False)
def get_reserved_slots():
    # Query the database for all booked slots, ordered by order date
    booked_slots = (
        db.session.query(Order.order_date, Order.order_time, Order.slot_number)
        .order_by(Order.order_date)
        .all()
    )

    # Initialize an empty dictionary to group the slots by date
    grouped_slots = {}
    for slot in booked_slots:
        # Convert the date to a string in ISO format
        date_str = slot[0].isoformat()

        # If the date is not already a key in the dictionary, add it with an empty list as its value
        if date_str not in grouped_slots:
            grouped_slots[date_str] = []

        # Append the time and slot number to the list of slots for this date
        grouped_slots[date_str].append({"time": slot[1].isoformat(), "slot": slot[2]})

    # Return the grouped slots as a JSON response with a 200 status code
    return jsonify(grouped_slots), 200


@book_bp.route("/book", methods=["POST"], strict_slashes=False)
def create_book():
    # Check if the request contains JSON data, if not, abort with a 400 status code
    if not request.get_json():
        abort(400, description="No input data provided")

    # Check if all required fields are present in the request data, if not, abort with a 400 status code
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
        # Get the JSON data from the request
        data = request.get_json()

        # Check if an order already exists with the same phone number and no payment
        order = Order.query.filter_by(phone_number=data["phone_number"]).first()
        if order and not order.payment:
            return jsonify({"message": "Order already exist"}), 402

        # Create a new Order object with the data from the request
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

        # Add the new Order object to the database session
        db.session.add(new_book)

        # Commit the changes to the database
        db.session.commit()

        # Return a success message, the order id, and a payment status as a JSON response with a 201 status code
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
        # If an error occurs, abort the request with a 500 status code and the error message
        abort(500, description=str(e))


@book_bp.route("/book/<id>", methods=["GET"], strict_slashes=False)
def get_book(id):
    # Query the database for an order with the provided id
    book_obj = Order.query.get(id)

    # If no order is found, abort the request with a 404 status code and an error message
    if not book_obj:
        abort(404, description="Order not found")

    try:
        # If the order's payment attribute is False, return a message indicating that payment was not successful with a 402 status code
        if not book_obj.payment:
            return jsonify({"message": "Payment not Successful"}), 402
        else:
            # If the order's payment attribute is True, return a success message with a 200 status code
            return (
                jsonify({"message": "Order successfully booked"}),
                200,
            )

    except Exception as e:
        # If an error occurs, abort the request with a 500 status code and the error message
        abort(500, description=str(e))
