class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.message = ({message: "Validation Error"});
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.message = ({message: "Not Found"});
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
    this.message = ({message: "Server Error"});
  }
}
class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = "CastError";
    this.statusCode = 400;
    this.message = ({message: "Cast Error"});
  }
}

module.exports = { ValidationError, NotFoundError, ServerError, CastError };