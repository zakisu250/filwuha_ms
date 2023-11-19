from filwuha.models import db


class Order(db.Model):
    __tablename__ = "orders"

    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(45), nullable=False)
    last_name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(45), nullable=True)
    phone_number = db.Column(db.String(45), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    order_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    payment = db.Column(db.Boolean, nullable=False)

    def __init__(
        self,
        first_name,
        last_name,
        email,
        phone_number,
        order_date,
        order_time,
        price,
        payment,
    ):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.order_date = order_date
        self.order_time = order_time
        self.price = price
        self.payment = payment

    def serilaize(self):
        return {
            "order_id": self.order_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "order_date": self.order_date,
            "order_time": self.order_time,
            "price": self.price,
            "payment": self.payment,
        }