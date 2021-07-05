async function handleLogInSubmit(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(loginForm));
  console.log(data);
  loginUser(data.email, data.password);
}

loginForm.addEventListener('submit', handleLogInSubmit);
