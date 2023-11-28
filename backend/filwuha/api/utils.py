import jwt
import datetime
from decouple import config


def generate_token(adminId):
    payload = {
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=30),
        "iat": datetime.datetime.utcnow(),
        "sub": adminId,
    }
    token = jwt.encode(payload, config("SECRET_KEY"), algorithm="HS256")

    return token
