const User = require('../models/user');
const { ValidationError, NotFoundError, CastError } = require('../utils/errors');

// get Users
const getUsers = (req, res) => {
  console.log(req);
  User.find({}).then((items) => res.status(200).send(items)).catch((e) => {
    console.log(e);
    if(e.name && e.name === 'ValidationError'){
    const validationError = new ValidationError();
    return res.status(validationError.statusCode).send(validationError.message);
    }
  })
};

// get User
const getUser = (req,res) => {
  const {userId} = req.params;


  User.findById(userId)
.orFail(() => {
  const castError = new CastError();
  return res.status(castError.statusCode).send(castError.message)
})
  .then((item) => res.status(200).send({data:item})).catch((e) => {
    console.log(e);
    if(e.name && e.name === 'NotFoundError'){
      console.log('throwing a NotFoundError');
      const notFoundError = new NotFoundError();
      return res.status(notFoundError.statusCode).send(notFoundError.message);
      } else {
        console.log('throwing a validationError');
        const validationError = new ValidationError();
        console.log(validationError.message);
      return res.status(validationError.statusCode).send(validationError.message);
      }
});
};

// create User
const createUser = (req,res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({name, avatar}).then((item) => {
    console.log(item);
    res.send({data: item})
  }).catch((e) => {
    if(e.name && e.name === 'ValidationError'){
      console.log(ValidationError);
      const validationError = new ValidationError();
      return res.status(validationError.statusCode).send(validationError.message);
      }
  })
};

module.exports = {
  getUsers, getUser, createUser
}