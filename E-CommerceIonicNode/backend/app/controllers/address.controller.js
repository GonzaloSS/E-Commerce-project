const db = require("../models");
const Address = db.address;
const Op = db.Sequelize.Op;

// Create and Save a new Adress
// req --> request (contains the body)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.street  || !req.body.number || !req.body.zipCode || !req.body.province || !req.body.location || !req.body.country) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Address
  const address = {
    street: req.body.street,
    number: req.body.number,
    zipCode: req.body.zipCode,
    location: req.body.location,
    province: req.body.province,
    country: req.body.country
  };

  // Save an Address in the database
  Address.create(address)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address."
      });
    });
};

exports.findAll = (req, res) => {

  Address.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Addresses."
      });
    });
};

// Find a single Airport with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Address.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message:
            "No Address found with that id"
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

// Update an Address by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Address.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Address with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Address with id=" + id
      });
    });

};

// Delete an Address with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Address.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete the Address with this id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Address with id=" + id
      });
    });
};

