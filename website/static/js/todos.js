// API to delete task
function deleteTodo(todoId) {
    fetch(`/delete/${todoId}`, {
        method: 'POST',  // Match the Python route expecting POST
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Task deleted successfully!');
            // Remove the task row from the DOM (optional for smooth transition)
            document.getElementById(`task-${todoId}`).remove();
        } else {
            console.error('Failed to delete task.');
        }
    });
}

// API to update tasks
function updateTodo(todoId) {
    // Get the updated values from the form or modal
    const updatedItem = prompt("Enter new item:");
    const updatedDescription = prompt("Enter new description:");
    const updatedLocation = prompt("Enter new location:");
    const updatedNotes = prompt("Enter new notes:");
    const updatedStatus = prompt("Enter new status:");
    const updatedDate = prompt("Enter new date (YYYY-MM-DD):");

    fetch(`/update/${todoId}`, {
        method: 'POST',  // Using POST since the Flask route accepts it
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: updatedItem,
            description: updatedDescription,
            location: updatedLocation,
            notes: updatedNotes,
            status: updatedStatus,
            date: updatedDate
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Task updated successfully!');
            // Optionally, update the UI with the new values without a full page reload
            document.getElementById(`task-item-${todoId}`).textContent = updatedItem;
            document.getElementById(`task-description-${todoId}`).textContent = updatedDescription;
            // Add similar updates for location, notes, status, date
        } else {
            console.error('Failed to update task.');
        }
    });
}