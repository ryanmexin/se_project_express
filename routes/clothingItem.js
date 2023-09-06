const router = require("express").Router();
const auth = require("../middlewares/auth");

const { createItem, getItems, deleteItem } = require("../controllers/clothingItem");

// Read
router.get("/", getItems);

router.use(auth);

// Create

router.post("/", createItem);

// Delete

router.delete('/:itemId', deleteItem)

module.exports = router;
