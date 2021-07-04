function handleLogInSubmit(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(loginForm));
  console.log(data);

  loginUser(data.email, data.password).then(() => {
    if (loggedIn) {
      document.location.href = '/';
    } else {
    }
  });
}

loginForm.addEventListener('submit', handleLogInSubmit);
