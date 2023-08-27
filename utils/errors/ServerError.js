class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
    this.message = ({message: "Server Error"});
  }
}

module.exports = { ServerError};