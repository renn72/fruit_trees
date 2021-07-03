const getFruitTrees = async () => {
  let res = await axios.get('/api/trees');
  return res.data;
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
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

const areYouLoggedIn = async () => {
  res = await axios.get('/api/users/logged');

  res.data.loggedIn ? (userId = res.data.userId) : (UserId = 0);

  return res.data.loggedIn;
};

const logoutUser = async () => {
  axios.get('/api/users/logout');
  loggedIn = false;
};
