const router = require('express').Router();
const clothingItem = require('./clothingItem')
const user = require('./users')
const like = require('./likes')

router.use('/items', clothingItem);

router.use('/user', user)

router.use('/items', like)

router.use((req, res) =>{
  res.status(500).send({message: 'Router not found'})
});

module.exports = router;