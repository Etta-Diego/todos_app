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




function updateTodo(taskId) {
    // Use JavaScript to grab the values from the table row
    const taskNumber = document.getElementById(`task-number-${taskId}`).innerText;
    const item = document.getElementById(`task-item-${taskId}`).innerText;
    const description = document.getElementById(`task-description-${taskId}`).innerText;
    const location = document.getElementById(`task-location-${taskId}`).innerText;
    const date = document.getElementById(`task-date-${taskId}`).innerText;
    const notes = document.getElementById(`task-notes-${taskId}`).innerText;
    const status = document.getElementById(`task-status-${taskId}`).innerText;
    const priority = document.getElementById(`task-priority-${taskId}`).innerText;

    // Populate the modal form fields with the existing data
    document.getElementById('taskId').value = taskId;  // Hidden input to store task ID
    document.getElementById('taskNumber').value = taskNumber;  // Task number field
    document.getElementById('update_item').value = item;  // Item name field
    document.getElementById('update_description').value = description;  // Description field
    document.getElementById('update_location').value = location;  // Location field
    document.getElementById('update_date').value = date;  // Date field
    document.getElementById('update_note').value = notes;  // Notes field

    // Set the status and priority dropdowns
    document.getElementById('update_status').value = status;  // Status dropdown
    document.getElementById('update_priority').value = priority;  // Priority dropdown

    // Open the popup modal
    const popup_el = document.querySelector('#update_task');
    if (popup_el) {
        popup_el.classList.add('is-active');  // Add class to make modal visible
    }
}


function submitUpdate() {
    const taskId = document.getElementById('taskId').value;
    const updatedItem = document.getElementById('update_item').value;
    const updatedDescription = document.getElementById('update_description').value;
    const updatedLocation = document.getElementById('update_location').value;
    const updatedDate = document.getElementById('update_date').value;
    const updatedNotes = document.getElementById('update_note').value;
    const updatedStatus = document.getElementById('update_status').value;
    const updatedPriority = document.getElementById('update_priority').value;

    // Send the updated data via an AJAX request or a form submit (depending on your setup)
    // You can use fetch API, axios, or jQuery.ajax based on your preferred method
}