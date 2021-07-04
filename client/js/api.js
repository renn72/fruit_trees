const getFruitTrees = async () => {
  let res = await axios.get('/api/trees');
  res.data['likes'] = 3;
  return res.data;
};

const createFruitTree = async (user_id, name, details, loc_lat, loc_long) => {
  const data = {
    user_id: user_id,
    name: name,
    details: details,
    loc_lat: loc_lat,
    loc_long: loc_long,
  };

  axios
    .post('/api/trees', data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

const getComments = async () => {
  res = await axios.get('/api/comments');
  return res.data;
};

const getLikes = async () => {
  res = await axios.get('/api/likes');
  return res.data;
};

const getTypes = async () => {
  res = await axios.get('/api/types');
  return res.data;
};

const getUser = async (id) => {
  res = await axios.get(`/api/users/${id}`);
  console.log(res.data);
  return res.data;
};

const getAllUsers = async () => {
  res = await axios.get(`/api/users`);
  console.log(res.data);
  return res.data;
};

const createUser = async (name, email, password) => {
  let password_digest = password;
  const data = {
    name: name,
    email: email,
    password_digest: password_digest,
  };

  axios
    .post('/api/users/', data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

const loginUser = async (email, password) => {
  let password_digest = password;

  const data = {
    email: email,
    password_digest: password_digest,
  };

  axios
    .post('/api/users/login', data)
    .then((res) => {
      console.log(res);
      loggedIn = true;
      userId = res.data.userId;
      userName = res.data.name;
    })
    .catch((err) => {
      console.log(err.response.data.message);
      userId = 0;
      userName = '';
    });
};

const areYouLoggedIn = async () => {
  res = await axios.get('/api/users/logged');

  if (res.data.loggedIn) {
    userId = res.data.userId;
    userName = res.data.name;
  } else {
    UserId = 0;
    userName = '';
  }
  console.log(res.data.loggedIn);

  return res.data.loggedIn;
};

const logoutUser = async () => {
  axios.get('/api/users/logout');
  loggedIn = false;
};

// extra page building code

if (loggedIn) {
  userThumbnailAccount.innerHTML = `<h2>${userName
    .charAt(0)
    .toUpperCase()}</h2>`;
} else {
  userThumbnailAccount.innerHTML = userThumbnailInnerHtmlSVG;
}
