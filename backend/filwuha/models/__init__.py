from flask_sqlalchemy import SQLAlchemy
from filwuha import app
from flask_migrate import Migrate

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from filwuha.models.admin import Admin
from filwuha.models.order import Order
