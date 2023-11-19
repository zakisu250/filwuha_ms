from filwuha import app
from filwuha.models import db

if __name__ == "__main__":
    db.init(app)
    app.run(debug=True)
