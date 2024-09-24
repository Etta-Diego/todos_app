// API to delete task
// function deleteTodo(todoId) {
//     fetch(`/delete/${todoId}`, {
//         method: 'POST',  // Match the Python route expecting POST
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Task deleted successfully!');
//             // Remove the task row from the DOM (optional for smooth transition)
//             document.getElementById(`task-${todoId}`).remove();
//         } else {
//             console.error('Failed to delete task.');
//         }
//     });
// }

// function deleteTodo(todoId) {
//     fetch(`/delete/${todoId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())  // Expect a JSON response
//     .then(data => {
//         if (data.status === 'success') {
//             console.log('Task deleted successfully!');
//             // Remove the task row from the DOM
//             const deletedRow = document.querySelector(`#task-row-${todoId}`);
//             if (deletedRow) {
//                 deletedRow.remove();
//             }
//             alert('Task deleted and task numbers updated!');
//         } else {
//             console.error('Failed to delete task: ' + data.message);
//             alert('Error: ' + data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred while deleting the task.');
//     });
// }




// function deleteTodo(todoId) {
//     fetch(`/delete/${todoId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())  // Expect a JSON response
//     .then(data => {
//         if (data.status === 'success') {
//             console.log('Task deleted successfully!');
//             // Remove the task row from the DOM
//             const deletedRow = document.querySelector(`#task-row-${todoId}`);
//             if (deletedRow) {
//                 deletedRow.remove();
//             }

//             alert('Task deleted and task numbers updated!');
//         } else {
//             console.error('Failed to delete task: ' + data.message);
//             alert('Error: ' + data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred while deleting the task.');
//     });
// }




// Function to handle task deletion
function deleteTodo(todoId) {
        fetch(`/delete/${todoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token() }}', // If CSRF protection is enabled
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Task successfully deleted, now update task numbers in the table
                const tasks = data.tasks;
                tasks.forEach(task => {
                    // Find the row in the table and update the task number
                    const row = document.querySelector(`#task-row-${task.id}`);
                    if (row) {
                        row.querySelector('.task-number').textContent = task.task_number;
                    }
                });

                // Optionally, remove the deleted task row from the table
                const deletedRow = document.querySelector(`#task-row-${todoId}`);
                if (deletedRow) {
                    deletedRow.remove();
                }

                alert('Task deleted and task numbers updated!');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }








// function updateTodo(todoId) {
//     fetch(`/get_task/${todoId}`)
//     .then(response => response.json())
//     .then(taskData => {
//         // Pre-fill the form fields with fetched task values
//         document.getElementById('taskId').value = todoId;
//         document.getElementById('taskNumber').value = taskData.task_number;
//         document.getElementById('item').value = taskData.item;
//         document.getElementById('description').value = taskData.description;
//         document.getElementById('location').value = taskData.location;
//         document.getElementById('notes').value = taskData.notes;
//         document.getElementById('status').value = taskData.status;
//         document.getElementById('date').value = taskData.date;
//         document.getElementById('priority').value = taskData.priority;

//         // Show the modal
//         document.getElementById('updateModal').style.display = 'block';
//     })
//     .catch(error => console.error('Error fetching task:', error));
// }



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
