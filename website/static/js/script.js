
// Selecting the elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');
const backdrop = document.createElement('div');

// Add backdrop class
backdrop.classList.add('menu-backdrop');

// Append the backdrop to the body
body.appendChild(backdrop);

// Burger icon click event
burger.addEventListener('click', () => {
    // Toggle menu visibility and backdrop
    navLinks.classList.toggle('nav-active');
    backdrop.classList.toggle('display'); // Show/hide the backdrop

    // Toggle body scrolling
    body.classList.toggle('fixed-position');

    // Burger animation toggle
    burger.classList.toggle('toggle');

    // Add red color on click
    burger.classList.toggle('clicked');
});

// Backdrop click event (close the menu)
backdrop.addEventListener('click', function() {
    // Remove menu and backdrop visibility
    navLinks.classList.remove('nav-active');
    this.classList.remove('display'); // Hide the backdrop when clicked
    body.classList.remove('fixed-position');
    burger.classList.remove('toggle');
    
    // Remove clicked state
    burger.classList.remove('clicked');
});




// -------- JavaScript for the Login and Sign up eye

 function togglePassword(inputId, eyeId, eyeSlashId) {
        var inputField = document.getElementById(inputId);
        var eye = document.getElementById(eyeId);
        var eyeSlash = document.getElementById(eyeSlashId);

        if (inputField.type === "password") {
            inputField.type = "text";
            eye.style.opacity = "1";         // Show the eye icon
            eyeSlash.style.opacity = "0";    // Hide the eye-slash icon
        } else {
            inputField.type = "password";
            eye.style.opacity = "0";         // Hide the eye icon
            eyeSlash.style.opacity = "1";    // Show the eye-slash icon
        }
    }


// ------------ JavaScript for the flash message

    // Function to close alert when clicking the close button
function closeAlert(alertElement) {
    alertElement.style.animation = 'slideUp 0.5s forwards'; // Apply slideUp animation
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 500); // Wait for animation to finish before hiding the alert
}

// Automatically hide alert after 5 seconds
setTimeout(function() {
    const alert = document.querySelector('.alert-pop-up .alert');
    if (alert) {
        alert.style.animation = 'slideUp 0.5s forwards'; // Apply slideUp animation
        setTimeout(() => {
            alert.style.display = 'none';
        }, 500); // Wait for animation to finish before hiding
    }
}, 5000); // 5000 milliseconds = 5 seconds


// button pop up function
window.onload = () => {
    const popup_btns = document.querySelectorAll('.popup-button');

    popup_btns.forEach(button => {
        button.addEventListener('click', e => {
            const target = e.target.dataset.target;

            const popup_el = document.querySelector(target);
            if (popup_el != null) {
                popup_el.classList.toggle('is-active');
            }
        });
    });
}