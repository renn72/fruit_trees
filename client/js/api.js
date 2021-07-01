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

const testReq = async () => {
  let res = await getFruitTrees();
  console.log(res);
};

const getFruitTree = (id) => {};

const getUser = async (id) => {
  res = await axios.get(`/api/user/${id}`);
  console.log(res.data);
};
