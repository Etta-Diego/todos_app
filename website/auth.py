from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user
from .models import User 
from sqlalchemy.exc import IntegrityError



# Create a Blueprint for authentication-related routes
auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    """
    Handles user login. On GET request, renders the login page.
    On POST request, validates user credentials and logs the user in.
    
    Returns:
        str: Rendered HTML template for login.
    """
    if request.method == 'POST':
        # Match the form names with the input names in your login.html
        email = request.form.get('email')
        password = request.form.get('password')

        # Query the User table for a record where the email column matches the provided regEmail.
        user = User.query.filter_by(email=email).first()
        if user:
            # Validate the password
            if check_password_hash(user.password, password):
                flash('Log in successfully!', category='success')
                login_user(user, remember=request.form.get('remember_me'))
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    data = request.form
    print(data)

    return render_template("login.html", user=current_user)

@auth.route('/logout',  methods=['GET', 'POST'])
@login_required
def logout():
    """
    Handles user logout and redirects to the landing page.
    
    Returns:
        str: Redirect to the landing page.
    """
    logout_user()
    flash('You have been logged out.', category='success')
    return redirect(url_for('views.landing'))



@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email').lower()  # Normalize to lowercase
        password = request.form.get('password')
        confirmPassword = request.form.get('confirmPassword')
        
        # Query the User table for a record where the email matches
        user = User.query.filter_by(email=email).first()

        if user:
            flash('Email already exists.', category='error')
        elif len(username) < 2:
            flash('Username must be greater than 1 character.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 4 characters.', category='error')
        elif password != confirmPassword:
            flash('Passwords do not match', category="error")
        elif len(password) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(
                email=email,
                username=username,
                password=generate_password_hash(password, method='pbkdf2:sha256')
            )

            try:
                db.session.add(new_user)
                db.session.commit()
                login_user(new_user, remember=True)
                flash('Account created successfully!', category='success')
                return redirect(url_for('views.home'))
            except IntegrityError:
                db.session.rollback()  # Rollback the session in case of error
                flash('Email already exists. Please log in or use another email.', category='error')

    return render_template("sign_up.html", user=current_user)