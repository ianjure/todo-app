// To display user information as admin
document.addEventListener("DOMContentLoaded", async () => {

    // Get the token, username, and role from local storage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    // Redirect to login page if the token, username, or role does not exist
    if (!token || !username || !role) {
        window.location.replace("/admin/login");
        return;
    }

    // Prevent non-admin users from accessing the admin dashboard
    if (role !== "admin") {
        window.location.replace(`/${username}`);
        return;
    }

    // Set username on the page
    document.getElementById("username").innerText = username;
});