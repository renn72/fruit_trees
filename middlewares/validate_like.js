function invalidLikeError(msg) {
  let err = new Error(msg);
  err.status = 422;
  return err;
}

function validateLike(req, res, next) {
  const { fruit_tree_id, user_id } = req.body;
  next();
}

module.exports = validateLike;
