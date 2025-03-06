// To protect routes from unauthorized access
document.addEventListener("DOMContentLoaded", () => {

    // Get the token, username, and role from the local storage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    // Get the current page
    const currentPage = window.location.pathname;

    // Redirect to login if token, username, or role is missing
    if (!token || !username || !role) {
        if (currentPage.includes("admin")) {
            window.location.replace("/admin/login");
        } else {
            window.location.replace("/login");
        }
        return;
    }

    // Redirect users to their dashboard if they try to access admin pages
    if (currentPage.startsWith("/admin") && role !== "admin") {
        window.location.replace(`/${username}`);
        return;
    }

    // Redirect admins to their dashboard if they try to access user pages
    if (!currentPage.startsWith("/admin") && role === "admin") {
        window.location.replace(`/admin/${username}`);
        return;
    }

    // Redirect users to their dashboard if they try to access another user's page
    if (role === "user" && currentPage !== `/${username}`) {
        window.location.replace(`/${username}`);
        return;
    }

    // Redirect admins to their dashboard if they try to access another admin's page
    if (role === "admin" && currentPage !== `/admin/${username}`) {
        window.location.replace(`/admin/${username}`);
        return;
    }
});
