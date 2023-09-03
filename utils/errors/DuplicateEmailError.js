class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateEmailError";
    this.statusCode = 401;
    this.message = ({message: "This email already exists"});
  }
}

module.exports = {DuplicateEmailError};