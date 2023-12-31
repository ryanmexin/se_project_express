const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const {AuthError } = require("../utils/errors/AuthError");
const {UnauthorizedError} = require("../errors/unauthorized-error");




const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    // required: true,
    validate: {
      validator: (v) => validator.isURL(v) || v === "",
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "This is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("password")
    .then((x) => {
      if (!email || !password) {
        return Promise.reject(new UnauthorizedError("Authentication Failed"));
      }

      if (!x) {
        return Promise.reject(new UnauthorizedError("Authentication Failed"));
      }

      return bcrypt.compare(password, x.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError("Authentication Failed"));
        }
        return x;
      });
    });
};

module.exports = mongoose.model("User", user);
