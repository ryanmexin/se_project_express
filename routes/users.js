const router = require("express").Router();

const {getCurrentUser, updateCurrentUser } = require("../controllers/users");

// CRUD

router.get('/me', getCurrentUser)

router.patch('/me', updateCurrentUser)

module.exports = router;