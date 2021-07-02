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
  res = await axios.get(`/api/user/${id}`);
  console.log(res.data);
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
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};
