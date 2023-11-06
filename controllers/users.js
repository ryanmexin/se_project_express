const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { ValidationError } = require("../utils/errors/ValidationError");
// const { CastError } = require("../utils/errors/CastError");
// const { ServerError } = require("../utils/errors/ServerError");
// const { DuplicateEmailError } = require("../utils/errors/DuplicateEmailError");
// const { AuthError} = require("../utils/errors/AuthError");
// const { JWT_SECRET } = require("../utils/config");
const {JWT_SECRET} = require("../utils/config");



const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unauthorized-error");
// const ForbiddenError = require("../errors/forbidden-error");
const ConflictError = require("../errors/conflict-error");


const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    // Check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
       next(new ConflictError("Email already exist"));
    }

     // Hash the password
     const hash = await bcrypt.hash(password, 10);

     // Create the user
     const createdUser = await User.create({ name, avatar, email, password: hash });
     const userData = createdUser.toObject();
     delete userData.password;

     res.status(200).send({ userData });
   } catch (error) {
     console.error(error);

     console.error(error);
            if (error.name === "ValidationError") {
              next(new BadRequestError("Error from createUser"));
            } else {
               next(error);
            }

   }
 };


const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
  .orFail()
    .then((user) => {
     res.status(200).send({ user });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Error from getUser"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("Error from getUser"));
      } else {
        next(e);
      }
    });
};

const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar: avatar||"" },
    { new: true, runValidators: true },
  )
  .orFail()
  .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Error from updateUser"));
      } else if (e.name === "ValidationError") {
        next(new BadRequestError("Error from updateUser"));
      } else {
        next(e);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
  .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send the token as part of the response
      res.status(201).send({ _id: user._id, email: user.email, token });
  })
  .catch(() => {
    // Handle errors
    next(new UnauthorizedError("Error from signinUser"));
  });
};



module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
