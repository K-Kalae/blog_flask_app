from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

jwt = JWTManager()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # App configuration
    app.config.from_object('config.Config')

    # Enable CORS (so React can talk to Flask)
    CORS(app)

    # Initialize database
    db.init_app(app)
    jwt.init_app(app)

    from .routes import main
    app.register_blueprint(main)
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()

    return app
