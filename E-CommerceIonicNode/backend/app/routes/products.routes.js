module.exports = app => {
    const product = require("../controllers/products.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", product.create);
  
    // Retrieve all Products
    router.get("/", product.findAll);

    // Retrieve a single Product with id
    router.get("/:id", product.findOne);
  
    // Update a Product with an id
    router.put("/:id", product.update);
  
    // Delete a Product with id
    router.delete("/:id", product.delete);
  
    
    app.use('/api/product', router);
  };