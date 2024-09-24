from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Todos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_number = db.Column(db.Integer, nullable=False)   
    item = db.Column(db.String(200))
    description = db.Column(db.String(2000))
    location = db.Column(db.String(200))
    notes = db.Column(db.String(2000))
    date = db.Column(db.DateTime(timezone=True), default=func.now)
    status = db.Column(db.String(50))  # Add a status field
    priority = db.Column(db.String(50)) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    
class User(db.Model, UserMixin):
    """
    Represents a user in the database.

    Attributes:
        id (int): The unique identifier for the user.
        email  (str): The email address of the user.
        password
 (str): The hashed password of the user.
        username
 (str): The username of the user.
        notes (list of Note): The notes associated with the user.
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False) 