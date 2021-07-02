function invalidUserError(msg) {
  let err = new Error(msg);
  err.status = 422;
  return err;
}

function validateUserLogin(req, res, next) {
  const { name, email, password_digest } = req.body;

  next();
}

module.exports = validateUserLogin;
