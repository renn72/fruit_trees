const buildAccountPage = async () => {
  loggedIn = await areYouLoggedIn();
  renderUserThumb();
};

buildAccountPage();
