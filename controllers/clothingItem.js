const ClothingItem = require("../models/clothingItem");
const { ValidationError, NotFoundError } = require("../utils/errors");

const createItem = (req, res) => {
  //console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  console.log(imageUrl);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);

      res.send({ data: item });
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
      if (e.name && e.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
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
        return res.status(notFoundError.statusCode).send(notFoundErrormessage);
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res
        .status(204)
        .send({})
        .catch((e) => {
          if (e.name && e.name === "NotFoundError") {
            const notFoundError = new NotFoundError();
            return res
              .status(notFoundError.statusCode)
              .send(notFoundError.message);
          }
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
