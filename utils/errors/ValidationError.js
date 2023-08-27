class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.message = ({message: "Validation Error"});
  }
}


module.exports = { ValidationError};