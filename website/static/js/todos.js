function deleteTodo(todoId) {
    fetch(`/delete/${todoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())  // Expect a JSON response
    .then(data => {
        if (data.status === 'success') {
            console.log('Task deleted successfully!');
            
            // Optionally remove the task from the DOM
            const deletedRow = document.querySelector(`#task-row-${todoId}`);
            if (deletedRow) {
                deletedRow.remove();  // This removes the task immediately
            }

            // Refresh the page after successful deletion
            window.location.reload();  // This will reload the current page
        } else {
            console.error('Failed to delete task: ' + data.message);
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the task.');
    });
}





function submitUpdate() {
    const todoId = document.getElementById('taskId').value;
    const updatedItem = document.getElementById('item').value;
    const updatedDescription = document.getElementById('description').value;
    const updatedLocation = document.getElementById('location').value;
    const updatedNotes = document.getElementById('notes').value;
    const updatedStatus = document.getElementById('status').value;
    const updatedDate = document.getElementById('date').value;
    const updatedPriority = document.getElementById('priority').value;

    fetch(`/update/${todoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: updatedItem,
            description: updatedDescription,
            location: updatedLocation,
            notes: updatedNotes,
            status: updatedStatus,
            date: updatedDate,
            priority: updatedPriority
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Task updated successfully!');
            // Update the table with new task values
            document.getElementById(`task-item-${todoId}`).textContent = updatedItem;
            document.getElementById(`task-description-${todoId}`).textContent = updatedDescription;
            document.getElementById(`task-location-${todoId}`).textContent = updatedLocation;
            document.getElementById(`task-notes-${todoId}`).textContent = updatedNotes;
            document.getElementById(`task-status-${todoId}`).textContent = updatedStatus;
            document.getElementById(`task-date-${todoId}`).textContent = updatedDate;
            document.getElementById(`task-priority-${todoId}`).textContent = updatedPriority;

            // Close the modal
            document.getElementById('updateModal').style.display = 'none';
        } else {
            console.error('Failed to update task.');
        }
    });
}
