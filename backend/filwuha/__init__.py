from flask import Flask
from flask_cors import CORS
from decouple import config
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

bcrypt = Bcrypt(app)


@app.route("/")
def home():
    return "Hello world"


""" configurations """
MYSQL_USER = config("MYSQL_USER")
MYSQL_PASS = config("MYSQL_PASS")
MYSQL_HOST = config("MYSQL_HOST")
MYSQL_DB = config("MYSQL_DB")

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqldb://{MYSQL_USER}:{MYSQL_PASS}@{MYSQL_HOST}:3306/{MYSQL_DB}"

from filwuha.api.admin import admin_bp
from filwuha.api.book import book_bp

app.register_blueprint(admin_bp)
app.register_blueprint(book_bp)
