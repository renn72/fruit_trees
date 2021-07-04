function handleCreateUserFormSubmit(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(createUserForm));
  console.log(data);
  createUser(data.name, data.email, data.password);
}

createUserForm.addEventListener('submit', handleCreateUserFormSubmit);
