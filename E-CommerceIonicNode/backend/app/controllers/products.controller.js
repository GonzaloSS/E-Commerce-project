const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
// req --> request (contains the body)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name  || !req.body.description || !req.body.taxRate || !req.body.image 
    || !req.body.category || !req.body.availability) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const products = {
    name: req.body.name,
    description: req.body.description,
    taxRate: req.body.taxRate,
    image: req.body.image,
    category: req.body.category,
    availability: req.body.availability
  };

  // Save a Product in the database
  Products.create(products)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {

  Products.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Product."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Products.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message:
            "No Product found with that id"
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
          err.message || "Some error occurred while retrieving Product with id"
      });
      return;
    });
};

// Update a Products by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Products.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });

};

// Delete a Products with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Products.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

