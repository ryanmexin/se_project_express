const router = require("express").Router();
const auth = require("../middlewares/auth");

const { createItem, getItems, deleteItem } = require("../controllers/clothingItem");
const { validateCardBody, validateId } = require("../middlewares/validation");

// Read
router.get("/", getItems);

router.use(auth);

// Create

router.post("/", validateCardBody, createItem);

// Delete

router.delete('/:itemId', validateId, deleteItem)

module.exports = router;
