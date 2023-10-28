module.exports = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  console.log(err.statusCode);
  // check the status and display a message based on it
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};