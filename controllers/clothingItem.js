const ClothingItem = require("../models/clothingItem");
// const { ValidationError } = require("../utils/errors/ValidationError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
// const { CastError } = require("../utils/errors/CastError");
// const { ServerError } = require("../utils/errors/ServerError");
// const {ForbiddenError } = require("../utils/errors/Forbidden");



const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");

const createItem = (req, res, next) => {
  // console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  console.log(imageUrl);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      console.log(req.user._id);
      res.send({ data: item });
    })
    .catch((e) => {
      console.log(e);
      if (e.name === "ValidationError") {
        next(new BadRequestError("Error from createItem"));
      } else {
        next(e);
      }
    });
};

const getItems = (req, res, next) => {
  console.log(req);
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.log(e);
      next(e);
    });
};


const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findById(itemId)
  .orFail(() => new NotFoundError())
  .then((item) => {
    // Finds the ID and makes sure it matches the clothing Item
    if (String(item.owner) !== req.user._id) {
      const forbiddenError = new ForbiddenError();
      throw forbiddenError; // Throw the error to be caught by the common catch block
    }

    return ClothingItem.findByIdAndDelete(itemId)
      .orFail(() => new NotFoundError())
      .then(() => res.status(200).send({ message: "item deleted" }));
  })
  .catch((e) => {
    if (e.name === "DocumentNotFoundError") {
      next(new NotFoundError("Error from deleteItem"));
    } else if (e.name === "CastError") {
      next(new BadRequestError("Error from deleteIte"));
    } else {
      next(e);
    }
  });
};



module.exports = {
  createItem,
  getItems,
  deleteItem,
};


