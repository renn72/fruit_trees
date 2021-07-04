async function handleLogInSubmit(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(loginForm));

  loginUser(data.email, data.password);
}

loginForm.addEventListener('submit', handleLogInSubmit);
