const buildAccountPage = async () => {
  loggedIn = await areYouLoggedIn();
  renderUserThumb();
};

buildAccountPage();

userLogoutBtn.addEventListener('click', logoutUser)