const router = require('express').Router();
const { NotFoundError } = require("../utils/errors/NotFoundError");
const clothingItem = require('./clothingItem')
const user = require('./users')
const like = require('./likes')

router.use('/items', clothingItem);

router.use('/users', user)

router.use('/items', like)

router.use((req, res) => {
  const notFoundError = new NotFoundError();
  return res
    .status(notFoundError.statusCode)
    .send(notFoundError.message);
});
module.exports = router;