document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signed-up successfully!");
                window.location.href = "user-login.html";
            } else {
                document.getElementById("user-signup-error").textContent = data.message;
            }
        });
    }

    const userLoginForm = document.getElementById("user-login-form");
    const adminLoginForm = document.getElementById("admin-login-form");

    if (userLoginForm) {
        userLoginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "user-dashboard.html";
            } else {
                document.getElementById("user-login-error").textContent = data.message;
            }
        });
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "admin-dashboard.html";
            } else {
                document.getElementById("admin-login-error").textContent = data.message;
            }
        });
    }

    const userLogoutButton = document.getElementById("user-logout-button");
    const adminLogoutButton = document.getElementById("admin-logout-button");

    if (userLogoutButton) {
        userLogoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "user-login.html";
        });
    }

    if (adminLogoutButton) {
        adminLogoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "admin-login.html";
        });
    }
});