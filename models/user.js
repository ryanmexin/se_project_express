const mongoose = require("mongoose");
const validator = require("validator");


const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "This is not a Link",
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
    minLength: 8,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("password")
    .then((user) => {
      if (!email || !password) {
        return Promise.reject(new Error("Authentication Failed"));
      }

      if (!user) {
        return Promise.reject(new Error("Authentication Failed"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Authentication Failed"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", user);
