import jwt
import datetime
from decouple import config


def generate_token(admin):
    # Define the payload for the JWT
    payload = {
        # Set the expiration time (exp) to 3 days from now
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=3),
        # Set the issued at time (iat) to the current time
        "iat": datetime.datetime.utcnow(),
        # Set the subject (sub) to the admin
        "sub": admin,
    }

    # Encode the payload into a JWT using the secret key and the HS256 algorithm
    token = jwt.encode(
        payload,
        config("SECRET_KEY"),
        algorithm="HS256",
    )

    # Return the encoded JWT
    return token


def validate_request(required_fields):
    # Get the JSON data from the request
    data = request.get_json()

    # If no data is provided, abort the request with a 400 status code and an error message
    if not data:
        abort(400, description="No input data provided")

    # Check for any required fields that are missing from the data
    missing_fields = [field for field in required_fields if field not in data]

    # If there are any missing fields, abort the request with a 400 status code and an error message
    if missing_fields:
        abort(400, description=f"Missing fields: {', '.join(missing_fields)}")

    # If all required fields are present, return the data
    return data
