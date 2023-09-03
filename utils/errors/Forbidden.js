class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
    this.message = ({message: "You do not have permission to delete this item."});
  }
}

module.exports = {ForbiddenError};