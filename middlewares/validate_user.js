function invalidTreeError(msg) {
  let err = new Error(msg);
  err.status = 418;
  return err;
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateUser(req, res, next) {
  const { name, email } = req.body;

  if (!validateEmail(email)) {
    throw invalidTreeError('incorrect email');
  } else if (name.length < 2) {
    throw invalidTreeError('name to short');
  }

  next();
}

module.exports = validateUser;
