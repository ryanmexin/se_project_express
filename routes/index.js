const router = require('express').Router();
const { NotFoundError } = require("../utils/errors/NotFoundError");
const clothingItem = require('./clothingItem')
const user = require('./users')
const like = require('./likes')

router.use('/items', clothingItem);

router.use('/users', user)

router.use('/items', like)

router.use((req, res, next) => {
  const notFoundError = new NotFoundError();
  next(notFoundError);
});
module.exports = router;