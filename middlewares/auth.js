const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config.js");
const { DuplicateEmailError } = require("../utils/errors/DuplicateEmailError");

module.exports = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;
 const duplicateEmailError = new DuplicateEmailError()
  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(duplicateEmailError.statusCode)
      .send({ message: "Authorization required" });
  }

  // getting the token
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // we return an error if something goes wrong
    return res
      .status(DuplicateEmailError.status)
      .send({ message: "Forbidden Access" });
  }

  req.user = payload; // assigning the payload to the request object
  next();  // sending the request to the next middleware

};

