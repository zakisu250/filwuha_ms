from flask import Blueprint

book_bp = Blueprint("book", __name__, url_prefix="/api/v1")

@book_bp.route("/book", methods=["POST"])
def order():
 return "Booked"

