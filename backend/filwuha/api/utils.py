import jwt
import datetime
from decouple import config


def generate_token(admin):
    payload = {
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=3),
        "iat": datetime.datetime.utcnow(),
        "sub": admin,
    }
    token = jwt.encode(
        payload,
        config("SECRET_KEY"),
        algorithm="HS256",
    ).decode("utf-8")

    return token
