const ClothingItem = require("../models/clothingItem");
const { ValidationError, NotFoundError,CastError } = require("../utils/errors");

const createItem = (req, res) => {
  //console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  console.log(imageUrl);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);

      return res.send({ data: item });
    })
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "NotFoundError") {
        console.log("NotFoundError");
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      } else if (e.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
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

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name && e.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const notFoundError = new NotFoundError();
      return res
        .status(notFoundError.statusCode)
        .send( notFoundError.message);
    })
    .then(() =>
      res
        .status(200)
        .send({ message: "item deleted" })
        .catch((e) => {
          if (e.name === "ServerError") {
            const serverError = new ServerError();
            return res
              .status(serverError.statusCode)
              .send(serverError.message );
          }
          if (e.name && e.name === "NotFoundError") {
            const notFoundError = new NotFoundError();
            return res
              .status(notFoundError.statusCode)
              .send({ message: notFoundError.message });
          }
          if (e.name && e.name === "CastError") {
            const castError = new CastError();
            return res
              .status(castError.statusCode)
              .send(castError.message);
          }
          return;
        }),
    );
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};
