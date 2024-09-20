from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager 

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    """
    Create and configure the Flask application instance.

    Returns:
        Flask: The configured Flask application instance.
    """

    # Initialize the Flask application
    app = Flask(__name__)
    
    # Set the secret key for session management
    app.config['SECRET_KEY'] = 'SECRET'
    
    # Configure the database URI for SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    
    # Initialize SQLAlchemy with the app
    db.init_app(app)

    # Import blueprints
    from .views import views 
    from .auth import auth
    
    # Register blueprints for views and authentication routes
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    
    from .models import User, Todos
   
    # Create all database tables defined in models
    with app.app_context():
        db.create_all()

    # Initialize the LoginManager
    login_manager = LoginManager()
    
    # # Set the login view to redirect unauthorized users
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    
    @login_manager.user_loader
    def load_user(user_id):
        """
        Load a user from the database by ID.
        Args:
            id (int): The user ID.
        Returns:
            User: The user object or None if not found.
        """
        return User.query.get(int(user_id))

    return app

def create_database(app):
    """
    Create the database if it does not exist.

    Args:
        app (Flask): The Flask application instance used to create the database.

    Returns:
        Flask: The application instance.
    """
    # Check if the database file already exists
    if not path.exists('website/' + DB_NAME):
        with app.app_context():
       
        # Create all tables based on the models

            db.create_all()
        print('Created Database!')