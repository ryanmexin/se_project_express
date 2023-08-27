class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = "CastError";
    this.statusCode = 400;
    this.message = ({message: "Cast Error"});
  }
}

module.exports = { CastError };