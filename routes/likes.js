const router = require('express').Router();

const { likeItem, dislikeItem } = require('../controllers/likes');

//Update
router.put('/:itemId/likes', likeItem);
//Delete
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;