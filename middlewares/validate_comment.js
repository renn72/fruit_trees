function invalidCommentError(msg) {
  let err = new Error(msg);
  err.status = 422;
  return err;
}

function validateComment(req, res, next) {
  const { body, fruit_tree_id, user_id } = req.body;
  next();
}

module.exports = validateComment;
