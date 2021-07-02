// function invalidUserError(msg) {
//   let err = new Error(msg);
//   err.status = 422;
//   return err;
// }

const validateUserLogin = (req, res) =>
  req.email === res.email && req.password_digest === res.password_digest
    ? true
    : false;

module.exports = validateUserLogin;
