const User = require('../models/user');
const { ValidationError } = require("../utils/errors/ValidationError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { CastError } = require("../utils/errors/CastError");
const { ServerError } = require("../utils/errors/ServerError");

// get Users
const getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.log(e);
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send(serverError.message );
    });
};


// get User
const getUser = (req,res) => {
  const {userId} = req.params;

  User.findById(userId)
  .orFail(() => new NotFoundError())
  .then((item) => res.status(200).send({ data: item }))
  .catch((e) => {
    console.log(e);
    if (e.name && e.name === "CastError") {
      const castError = new CastError();
      return res
        .status(castError.statusCode)
        .send(castError.message);
    }
    if (e.name && e.name === "NotFoundError") {
      console.log("throwing a NotFoundError");
      const notFoundError = new NotFoundError();
      return res
        .status(notFoundError.statusCode)
        .send(notFoundError.message );
    }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send(serverError.message );
  });
};

// create User
const createUser = (req,res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
  .then((item) => {
    console.log(item);
    res.send({ data: item });
  })
  .catch((e) => {
    if (e.name && e.name === "ValidationError") {
      console.log(ValidationError);
      const validationError = new ValidationError();
      return res
        .status(validationError.statusCode)
        .send(validationError.message);
    }
    const serverError = new ServerError();
    return res
      .status(serverError.statusCode)
      .send(serverError.message );
  });
};


module.exports = {
  getUsers, getUser, createUser
}