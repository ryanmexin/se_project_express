const ClothingItem = require('../models/clothingItem');

module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there
  { new: true },
)

.then((item) => {
  res.status(200).send({ data: item });
})
.catch(() => res.status(500).send({ message: "like Error" }));


module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
.then((item) => res.send({ data: item }))
.catch(() => res.status(500).send({ message: "dislike Error" }));