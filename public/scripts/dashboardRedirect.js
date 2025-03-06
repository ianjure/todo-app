function dashboardRedirect() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
      
    // Redirect to dashboard if token, username, or role exists in local storage
    if (token || username || role) {
        if (role === "user") {
            window.location.replace(`/${username}`);
        } else {
            window.location.replace(`/admin/${username}`);
        }
        return;
    }
}

// Run on page load
dashboardRedirect();
