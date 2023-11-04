const router = require('express').Router();
const auth = require("../middlewares/auth");
const { likeItem, dislikeItem } = require('../controllers/likes');
const { validateId } = require("../middlewares/validation");

router.use(auth);
// Update
router.put('/:itemId/likes', validateId, likeItem);
// Delete
router.delete('/:itemId/likes',validateId, dislikeItem);

module.exports = router;