function dashboardRedirect() {
  // Get the token, username, and role from the local storage
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  
  // Redirect to dashboard if token, username, or role exists
  if (token || username || role) {
      window.location.replace(`/${username}`);
      return;
  }
}

dashboardRedirect();
