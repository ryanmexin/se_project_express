const ClothingItem = require('../models/clothingItem');
const { ValidationError, CastError } = require("../utils/errors");

module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there
  { new: true },
)

.then((items) => res.status(200).send(items))
.catch((e) => {
  console.log(e);
  if (e.name && e.name === "ValidationError") {
    const validationError = new ValidationError();
    return res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
  } else if (e.name && e.name === "CastError") {
    const castError = new CastError();
    return res
      .status(castError.statusCode)
      .send({ message: castError.message });
  }
});



module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
.then((item) => {
  if (!item) {
    return res.status(400).send({ message: "Item not found" });
  }
  res.send({ data: item });
})
.catch(() => res.status(500).send({ message: "dislike Error" }));
