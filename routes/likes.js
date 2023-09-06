const router = require('express').Router();
const auth = require("../middlewares/auth");
const { likeItem, dislikeItem } = require('../controllers/likes');

router.use(auth);
// Update
router.put('/:itemId/likes', likeItem);
// Delete
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;