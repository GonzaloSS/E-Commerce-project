module.exports = app => {
    const address = require("../controllers/address.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Address
    router.post("/", address.create);

    // Retrieve a single address with id
    router.get("/:id", address.findOne);
  
    // Update an Address with id
    router.put("/:id", address.update);
  
    // Delete an Address with id
    router.delete("/:id", address.delete);

    app.use('/api/address', router);
  };

  