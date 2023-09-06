const ClothingItem = require("../models/clothingItem");
const { ValidationError } = require("../utils/errors/ValidationError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { CastError } = require("../utils/errors/CastError");
const { ServerError } = require("../utils/errors/ServerError");
const {ForbiddenError } = require("../utils/errors/Forbidden");

const createItem = (req, res) => {
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
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send(serverError.message);
    });
};

const getItems = (req, res) => {
  console.log(req);
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.log(e);
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send(serverError.message);
    });
};


const deleteItem = (req, res) => {
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
    if (e.name === "CastError") {
      const castError = new CastError();
      return res.status(castError.statusCode).send(castError.message);
    } if (e.name === "NotFoundError") {
      const notFoundError = new NotFoundError();
      return res.status(notFoundError.statusCode).send(notFoundError.message);
    } if (e.name === "ForbiddenError") {
      // Handle ForbiddenError here
      return res.status(e.statusCode).send(e.message);
    }  {
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    }
  });
}



module.exports = {
  createItem,
  getItems,
  deleteItem,
};


