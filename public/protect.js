document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const currentPage = window.location.pathname;
    
    if (!token) {
        if (currentPage.includes("admin-dashboard")) {
            window.location.href = "admin-login.html";
        } else {
            window.location.href = "user-login.html";
        }
    }
});