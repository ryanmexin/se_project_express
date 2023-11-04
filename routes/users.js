const router = require("express").Router();
const auth = require("../middlewares/auth");

const {getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

// CRUD

router.use(auth);

router.get('/me', getCurrentUser)

router.patch('/me', validateUpdateUser, updateCurrentUser)

module.exports = router;
