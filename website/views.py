from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from flask_login import login_required, current_user
from . import db
from .models import User, Todos
from datetime import datetime
import requests
import random


views = Blueprint('views', __name__)

## Quotes
def fetch_random_quote():
    # Define your keywords list
    keywords = ['life', 'living', 'time', 'today', 'inspire', 'inspiration', 'choice', 'dream', 'failure', 'future', 'motivation', 'success', 'work']

    # Fetch 50 random quotes from ZenQuotes API
    response = requests.get('https://zenquotes.io/api/quotes')

    # Check if the API call was successful
    if response.status_code == 200:
        try:
            # Parse the JSON response
            quotes = response.json()

            # Filter quotes based on keywords
            matching_quotes = []
            for quote in quotes:
                # Check if any keyword appears in the quote
                for keyword in keywords:
                    if keyword.lower() in quote['q'].lower():  # Match keywords case-insensitively
                        matching_quotes.append(quote)
                        break  # Once a keyword matches, stop checking others for this quote

            # Pick a random matching quote
            if matching_quotes:
                selected_quote = random.choice(matching_quotes)['q']
                return selected_quote
            else:
                return "Even the best journeys have bumps along the way. You’ve got this!"
        except ValueError as e:
            # Handle JSON decoding errors
            print(f"Error decoding JSON: {e}")
            return "Even the best journeys have bumps along the way. You’ve got this! Onyinyechi and George"
    else:
        # If the request fails, return a default message
        print(f"API request failed with status code {response.status_code}")
        return "Even the best journeys have bumps along the way. You’ve got this! Onyinyechi and George"

    


@views.route('/')
def landing():
    return render_template('landing.html',  user=current_user)


@views.route('/form', methods=['POST', 'GET'])
@login_required
def home():
    # Code to handle form submission goes here
    if request.method == 'POST':

        task_count = Todos.query.filter_by(user_id=current_user.id).count() + 1

        # Retrieve data from the form
        item = request.form.get('item')
        description = request.form.get('description')
        location = request.form.get('location')
        date = request.form.get('date')
        priority = request.form.get('priority')
        status = request.form.get('status')
        notes = request.form.get('notes')

        new_task = Todos(
            task_number=task_count,
            item=item,
            status=status,
            notes=notes,
            description=description,
            location=location,
            date=datetime.strptime(date, '%Y-%m-%d'),
            priority=priority, 
            user_id=current_user.id,
            )

        # Add the task to the database
        db.session.add(new_task)
        db.session.commit()

        print(status)

        flash('Task added successfully!', category='success')
        return redirect(url_for('views.home'))

  # Fetch all tasks for the current user and enumerate them
    user_tasks = Todos.query.filter_by(user_id=current_user.id).all()
   


    # Fetch the random motivational quote
    quotes = fetch_random_quote()

    # Render the template with both tasks (numbered) and the quote
    return render_template('home.html', tasks=user_tasks, user=current_user, quote=quotes)


@views.route('/delete/<int:task_id>', methods=['POST'])
@login_required
def delete(task_id):
    # task = Todos.query.get_or_404(task_id)
    # Find the task to delete
    task_to_delete = Todos.query.get_or_404(task_id)

    # Delete the task
    if task_to_delete and task_to_delete.user_id == current_user.id:
        db.session.delete(task_to_delete)
        db.session.commit()

        # Fetch the remaining tasks and renumber them
        tasks = Todos.query.filter_by(user_id=current_user.id).order_by(Todos.task_number).all()

        # Renumber remaining tasks starting fCommitrom 1
        for index, task in enumerate(tasks, start=1):
            task.task_number = index

        #  the changes to the database
        db.session.commit()

        # Return the updated task list as JSON
        updated_tasks = [{'id': task.id, 'task_number': task.task_number} for task in tasks]
        return jsonify({'status': 'success', 'tasks': updated_tasks}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Task not found or unauthorized action!'}), 403


    return redirect(url_for('views.home'))

@views.route('/update/<int:task_id>', methods=['POST'])
@login_required
def update(task_id):
    task = Todos.query.get_or_404(task_id)
    if task.user_id == current_user.id:
        # Get updated data from the request
        data = request.get_json()
        task.item = data.get('item', task.item)
        task.description = data.get('description', task.description)
        task.priority = data.get('priority', task.priority)
        task.location = data.get('location', task.location)
        task.notes = data.get('notes', task.notes)
        task.status = data.get('status', task.status)
        task.date = datetime.strptime(data.get('date'), '%Y-%m-%d') if data.get('date') else task.date

        # Update the database
        db.session.commit()
        return {'message': 'Task updated successfully!'}, 200
    return {'message': 'Unauthorized'}, 403   


@views.route('/get_task/<int:task_id>', methods=['GET'])
def get_task(task_id):
    # Assuming Task is your SQLAlchemy model
    task = Todos.query.get_or_404(task_id)
    task_data = {
        'task_number': task.task_number,
        'item': task.item,
        'description': task.description,
        'location': task.location,
        'date': task.date.strftime('%Y-%m-%d'),  # Format date for HTML input
        'notes': task.notes,
        'status': task.status,
        'priority': task.priority
    }
    return jsonify(task_data)