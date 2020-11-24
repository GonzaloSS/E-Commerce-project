module.exports = app => {
    const orderProduct = require("../controllers/orderProduct.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", orderProduct.create);
  
    // Retrieve all Products
    router.get("/", orderProduct.findAll);

    // Retrieve a single Product with id
    router.get("/:id", orderProduct.findOne);
  
    // Update a Product with an id
    router.put("/:id", orderProduct.update);
  
    // Delete a Product with id
    router.delete("/:id", orderProduct.delete);
  
    
    app.use('/api/orderProduct', router);
  };