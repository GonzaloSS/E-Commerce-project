const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
// req --> request (contains the body)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name  || !req.body.lastName || !req.body.email || !req.body.password ||
    !req.body.username || !req.body.isAdmin || !req.body.id_address) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an User
  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    isAdmin: req.body.isAdmin,
    id_address: req.body.id_address
  };

  // Save an User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};


// Find a single User with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message:
            "No User found with that id"
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
          err.message || "Some error occurred while retrieving User with id"
      });
      return;
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

