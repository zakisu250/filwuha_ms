from flask import Flask
from flask_cors import CORS
from decouple import config
from flask_bcrypt import Bcrypt

app = Flask(__name__)
# Enable Cross Origin Resource Sharing (CORS) for all origins on all routes starting with /api/
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize the Bcrypt extension for password hashing
bcrypt = Bcrypt(app)


@app.route("/")
def home():
    # Define a route for the root URL ("/") that returns "API is running"
    return "API is running..."


# Get the MySQL configuration from environment variables
MYSQL_USER = config("MYSQL_USER")
MYSQL_PASS = config("MYSQL_PASS")
MYSQL_HOST = config("MYSQL_HOST")
MYSQL_DB = config("MYSQL_DB")

# Configure the SQLALCHEMY_DATABASE_URI for the Flask-SQLAlchemy extension
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqldb://{MYSQL_USER}:{MYSQL_PASS}@{MYSQL_HOST}:3306/{MYSQL_DB}?ssl=REQUIRED"
# Disable the SQLALCHEMY_TRACK_MODIFICATIONS feature to save system resources
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Import the blueprints for the admin and book APIs
from filwuha.api.admin import admin_bp
from filwuha.api.book import book_bp

# Register the blueprints with the Flask application
app.register_blueprint(admin_bp)
app.register_blueprint(book_bp)
