// To handle user and admin authentication
document.addEventListener("DOMContentLoaded", () => {

    // If the signup form exists, add an event listener to it
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            // Prevent the default form submission
            event.preventDefault();

            // Get the username and password from the form
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Send a POST request to the server
            const response = await fetch("http://localhost:3000/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            // Get the response data
            const data = await response.json();

            // If the response is successful, display a success message and redirect the user to the login page
            // Otherwise, display an error message
            if (response.ok) {
                alert("Signed-up successfully!");
                window.location.href = "user-login.html";
            } else {
                document.getElementById("user-signup-error").textContent = data.message;
            }
        });
    }

    // If the login form exists, add an event listener to it
    const userLoginForm = document.getElementById("user-login-form");
    if (userLoginForm) {
        userLoginForm.addEventListener("submit", async (event) => {
            // Prevent the default form submission
            event.preventDefault();

            // Get the username and password from the form
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Send a POST request to the server
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            // Get the response data
            const data = await response.json();

            // If the response is successful, store the token in the local storage and redirect the user to the user dashboard
            // Otherwise, display an error message
            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "user-dashboard.html";
            } else {
                document.getElementById("user-login-error").textContent = data.message;
            }
        });
    }

    // If the admin login form exists, add an event listener to it
    const adminLoginForm = document.getElementById("admin-login-form");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", async (event) => {
            // Prevent the default form submission
            event.preventDefault();

            // Get the username and password from the form
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Send a POST request to the server
            const response = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            // Get the response data
            const data = await response.json();

            // If the response is successful, store the token in the local storage and redirect the user to the admin dashboard
            // Otherwise, display an error message
            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "admin-dashboard.html";
            } else {
                document.getElementById("admin-login-error").textContent = data.message;
            }
        });
    }

    // If the user logout button exists, add an event listener to it
    const userLogoutButton = document.getElementById("user-logout-button");
    if (userLogoutButton) {
        userLogoutButton.addEventListener("click", () => {
            // Remove the token from the local storage
            localStorage.removeItem("token");

            // Redirect the user to the user login page
            window.location.href = "user-login.html";
        });
    }

    // If the admin logout button exists, add an event listener to it
    const adminLogoutButton = document.getElementById("admin-logout-button");
    if (adminLogoutButton) {
        adminLogoutButton.addEventListener("click", () => {
            // Remove the token from the local storage
            localStorage.removeItem("token");

            // Redirect the user to the admin login page
            window.location.href = "admin-login.html";
        });
    }
});