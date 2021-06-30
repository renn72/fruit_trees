function invalidFruitTreeError(msg) {
  let err = new Error(msg);
  err.status = 422;
  return err;
}

function validateFruitTree(req, res, next) {
  const { name, loc_lat, loc_long, details, image_url, create_at, user_id } =
    req.body;

  next();
}

module.exports = validateFruitTree;
