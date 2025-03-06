function dashboardRedirect() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
      
    // Redirect to dashboard if token, username, or role exists
    if (token || username || role) {
        window.location.replace(`/${username}`);
        return;
    }
}

// Run on page load
dashboardRedirect();
