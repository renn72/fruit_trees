function handleEditUserFormSubmit(e) {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(editUserForm));
    
    console.log(data);

    updateUser(data.name, data.email, data.password);
}

editUserForm.addEventListener('submit', handleEditUserFormSubmit);