const router = require("express").Router();
const auth = require("../middlewares/auth");

const { createItem, getItems, deleteItem } = require("../controllers/clothingItem");

router.use(auth);
// CRUD

// Create

router.post("/", createItem);

// Read
router.get("/", getItems);

// Update



// Delete

router.delete('/:itemId', deleteItem)

module.exports = router;
