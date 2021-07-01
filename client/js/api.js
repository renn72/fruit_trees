let fruitTreeLocations = [];
let comments = [];
let likes = [];
let fruitTreeTypes = [];

const getFruitTrees = async () => {
  let res = await axios.get('/api/trees');
  fruitTreeLocations = res.data;
};

const getComments = async () => {
  res = await axios.get('/api/comments');
  comments = res.data;
};

const getLikes = async () => {
  res = await axios.get('/api/likes');
  likes = res.data;
};

const getTypes = async () => {
  res = await axios.get('/api/types');
  fruitTreeTypesTest = res.data;
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

getFruitTrees();
getComments();
getLikes();
getTypes();
