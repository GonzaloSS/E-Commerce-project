const db = require("../models");
const OrderProduct = db.orderProduct;
const Op = db.Sequelize.Op;

// Create and Save a new Product
// req --> request (contains the body)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_product  || !req.body.id_order) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const orderProduct = {
    id_product: req.body.id_product,
    id_order: req.body.id_order
  };

  // Save a Product in the database
  OrderProduct.create(orderProduct)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the fkorderproduct."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {

  OrderProduct.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fkorderproduct."
      });
    });
};

// Find a single OrderProduct with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  OrderProduct.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message:
            "No fkorderproduct found with that id"
        })
      }
      res.send(data);
      return;
    })
    .catch(err => {
      console.log(err.message);
      console.log("hola");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fkorderproduct with id"
      });
      return;
    });
};

// Update a OrderProduct by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OrderProduct.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "fkorderproduct was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update fkorderproduct with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating fkorderproduct with id=" + id
      });
    });

};

// Delete a OrderProduct with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OrderProduct.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "fkorderproduct was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete fkorderproduct with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete fkorderproduct with id=" + id
      });
    });
};

