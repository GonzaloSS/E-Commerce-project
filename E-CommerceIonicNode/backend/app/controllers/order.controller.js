const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new Order
// req --> request (contains the body)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.total || !req.body.status || !req.body.id_user) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Order
  const order = {
    total: req.body.total,
    status: req.body.status,
    id_user: req.body.id_user
  };

  // Save an Order in the database
  Order.create(order)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order."
      });
    });
};

// Retrieve all order from the database.
exports.findAll = (req, res) => {

  Order.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};


// Find a single Order with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Order.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message:
            "No order found with that id"
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
          err.message || "Some error occurred while retrieving Airport with id"
      });
      return;
    });
};

// Update an order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating order with id=" + id
      });
    });

};

// Delete an order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete the order with this id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete order with id=" + id
      });
    });
};

