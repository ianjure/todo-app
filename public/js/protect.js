// To protect routes from unauthorized access
document.addEventListener("DOMContentLoaded", () => {
    // Get the token from the local storage
    const token = localStorage.getItem("token");

    // Get the current page
    const currentPage = window.location.pathname;
    
    // If the token does not exist, redirect the user based on the current page
    if (!token) {
        if (currentPage.includes("admin-dashboard")) {
            window.location.href = "admin-login.html";
        } else {
            window.location.href = "user-login.html";
        }
    }
});