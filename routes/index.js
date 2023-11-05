const router = require('express').Router();
const NotFoundError = require("../errors/not-found-error");
console.log(NotFoundError)
const clothingItem = require('./clothingItem')
const user = require('./users')
const like = require('./likes')

router.use('/items', clothingItem);

router.use('/users', user)

router.use('/items', like)

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
module.exports = router;