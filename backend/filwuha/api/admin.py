from flask import Blueprint

admin_bp = Blueprint("admin", __name__, url_prefix="/api/v1")

@admin_bp.route("/admin/login", methods=["POST"])
def admin_login():
 return True

