from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from filwuha.models import db


class Admin(db.Model, UserMixin):
    # Define the table name
    __tablename__ = "admins"

    # Define the table columns
    admin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, username, password):
        # Initialize an Admin object with a username and a hashed password
        self.username = username
        self.password_hash = generate_password_hash(password)

    def serialize(self):
        # Return a dictionary representation of the Admin object
        return {
            "admin_id": self.admin_id,
            "username": self.username,
            "created_at": self.created_at,
        }
