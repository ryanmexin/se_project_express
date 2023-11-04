const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { AuthError } = require("../utils/errors/AuthError");
const {UnauthorizedError} = require("../errors/unauthorized-error")

module.exports = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;
  new AuthError()
  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError("Authorization Required"));
  }

  // getting the token
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // we return an error if something goes wrong
    return next(new UnauthorizedError("Authorization Required"));
  }

  req.user = payload; // assigning the payload to the request object
   // sending the request to the next middleware
 return next();

};

