class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateEmailError";
    this.statusCode = 409;
    this.message = ({message: "This email already exists"});
  }
}

module.exports = {DuplicateEmailError};