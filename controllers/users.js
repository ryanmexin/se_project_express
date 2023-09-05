const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { ValidationError } = require("../utils/errors/ValidationError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { CastError } = require("../utils/errors/CastError");
const { ServerError } = require("../utils/errors/ServerError");
const { DuplicateEmailError } = require("../utils/errors/DuplicateEmailError");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const { handle } = require("express/lib/application");

const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    // Check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
      const duplicateEmailError = new DuplicateEmailError();
      return res
        .status(duplicateEmailError.statusCode)
        .send(duplicateEmailError.message);
    }

    // Hash the password and create the user
    await bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          const userData = user.toObject();
          delete userData.password;
          res.status(200).send({ userData });
        }))
  } catch (error) {
    console.error(error);

    if (error.name && error.name === "ValidationError") {
      console.log(ValidationError);
      const validationError = new ValidationError();
      return res
        .status(validationError.statusCode)
        .send(validationError.message);
    }

    const serverError = new ServerError();
    return res.status(serverError.statusCode).send(serverError.message);
  }
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      handleError(req, res, err);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      return res.status(200).res.send({ data: user });
    })
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "CastError") {
        const castError = new CastError();
        return res.status(castError.statusCode).send(castError.message);
      }
      if (e.name && e.name === "NotFoundError") {
        console.log("throwing a NotFoundError");
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
  .then((user) => {
    if (email === req.body.email && password === req.body.password) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send the token as part of the response
      res.status(201).send({ _id: user._id, email: user.email, token });
    }
  })
  .catch((e) => {
    // Handle errors
    console.error(e);
    if (e.name && e.name === "ValidationError") {
      console.log(ValidationError);
      const validationError = new ValidationError();
      return res
        .status(validationError.statusCode)
        .send(validationError.message);
    } else {
      const duplicateEmailError = new DuplicateEmailError();
      return res
        .status(duplicateEmailError.statusCode)
        .send(duplicateEmailError.message);
    }
  });
};



module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
