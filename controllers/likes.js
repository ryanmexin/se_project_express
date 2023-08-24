const ClothingItem = require('../models/clothingItem');
const { ValidationError, CastError, NotFoundError } = require("../utils/errors");

module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add an _id to the array if it's not there
  { new: true },
)

.orFail(() => {
  const castError = new CastError();
    return res
      .status(castError.statusCode)
      .send({ message: castError.message }); // Remember to throw an error so .catch handles it instead of .then
})
.then((items) => res.status(200).send(items))
.catch((e) => {
  console.log(e);
  if (e.name && e.name === "CastError") {
    const castError = new CastError();
    return res
      .status(castError.statusCode)
      .send({ message: castError.message });
  } else if (e.name && e.name === "ValidationError") {
    const validationError = new ValidationError();
    return res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
  }
});



module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
.orFail()
.then((items) => res.status(200).send(items))
.catch((e) => {
  console.log(e);
  if (e.name && e.name === "CastError") {
    const castError = new CastError();
    return res
      .status(castError.statusCode)
      .send({ message: castError.message });
  } else if (e.name && e.name === "ValidationError") {
    const validationError = new ValidationError();
    return res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
  }
});
