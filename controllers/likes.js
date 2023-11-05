const ClothingItem = require('../models/clothingItem');
// const { ValidationError } = require("../utils/errors/ValidationError");
const { NotFoundError } = require("../errors/not-found-error");
// const { CastError } = require("../utils/errors/CastError");
// const { ServerError } = require("../utils/errors/ServerError");


const BadRequestError = require("../errors/bad-request-error");

module.exports.likeItem = (req, res, next) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there
  { new: true },
)
.orFail(() => new NotFoundError())
.then((items) => res.status(200).send(items))
.catch((e) => {
  console.log(e);
  if (e.name === "DocumentNotFoundError") {
    next(new NotFoundError("Error from likeItem"));
  } else if (e.name === "CastError") {
    next(new BadRequestError("Error from likeItem"));
  } else {
    next(e);
  }
});


module.exports.dislikeItem = (req, res, next) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
.orFail(() => new NotFoundError())
.then((items) => res.status(200).send(items))
.catch((e) => {
  console.log(e);
  if (e.name === "DocumentNotFoundError") {
    next(new NotFoundError("Error from dislikeItem"));
  } else if (e.name === "CastError") {
    next(new BadRequestError("Error from dislikeItem"));
  } else {
    next(e);
  }
});