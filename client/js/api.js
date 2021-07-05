const getFruitTrees = async () => {
  let res = await axios.get('/api/trees');

  res.data.forEach((tree) => {
    tree['likes'] = 3;
    tree['comments'] = [
      'nice tree',
      'shit tree',
      'tall tree',
      'short tree',
      'fruity tree',
    ];
  });

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
      res.data.fruit_tree['coords'] = {
        lat: res.data.fruit_tree.loc_lat,
        lng: res.data.fruit_tree.loc_long,
      };
      console.log(res.data.fruit_tree);
      addMarker(res);
    })
    .catch((err) => {
      console.log(err.response);
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
  let res = await axios.get(`/api/users/${id}`);
  console.log(res.data);
  return res.data;
};

const getAllUsers = async () => {
  res = await axios.get(`/api/users`);
  console.log(res.data);
  return res.data;
};

const updateUser = async (id, name, email, password_digest) => {
  data = {
    name: name,
    email: email,
    password_digest: password_digest,
  };
  let res = axios.put(`/api/users/${id}`, data);
  console.log(res);
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
      document.location.href = '/login';
    })
    .catch((err) => {});
};

const loginUser = async (email, password) => {
  let password_digest = password;

  console.log('post call');
  console.log(password);

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
      userName = res.data.userName;
      userEmail = res.data.email;
      document.location.href = 'index.html'; // I hate putting this here
    })
    .catch((err) => {
      console.log(err.response.data.message);
      userId = 0;
      userName = '';
      return res.data;
    });
};

const areYouLoggedIn = async () => {
  res = await axios.get('/api/users/logged');

  if (res.data.loggedIn) {
    userId = res.data.userId;
    userName = res.data.userName;
    userEmail = res.data.userEmail;
  } else {
    UserId = 0;
    userName = '';
    userEmail = '';
  }

  return res.data.loggedIn;
};

const logoutUser = async () => {
  axios.get('/api/users/logout');
  loggedIn = false;
};

const userThumbnailInnerHtmlSVG = `<svg
xmlns="http://www.w3.org/2000/svg"
width="1em"
height="1em"
fill="currentColor"
class="bi bi-person"
viewBox="0 0 16 16"
>
<path
  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
/>
</svg>`;

// extra page building code
const renderUserThumb = async () => {
  loggedIn = await areYouLoggedIn();
  if (userThumbnailAccount) {
    if (loggedIn) {
      if (userName) {
        userThumbnailAccount.innerHTML = `<h1>${userName
          .charAt(0)
          .toUpperCase()}</h1>`;
      }
    } else {
      userThumbnailAccount.innerHTML = userThumbnailInnerHtmlSVG;
    }
  }
};

renderUserThumb();
