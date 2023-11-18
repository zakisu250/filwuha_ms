from filwuha.models import db

class Order(db.Model):
    __tablename__ = 'order'

    order_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45), nullable=False)
    last_name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(45), nullable=True)
    phone_number = db.Column(db.String(45), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    order_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    payment = db.Column(db.boolean, nullable=False)