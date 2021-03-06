const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const procontroller = require("../controllers/products.controller");
const addcontroller = require("../controllers/address.controller.js");
const ordercontroller = require("../controllers/order.controller.js");
const orderProductcontroller = require("../controllers/orderProduct.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/auth/:id", controller.findOne);

  app.put("/api/auth/:id", controller.update);


  //ROUTES PRODUCTS

  app.post("/api/product", procontroller.create);

  app.get("/api/product", procontroller.findAll);

  app.get("/api/product/:id", procontroller.findOne);

  app.put("/api/product/:id", procontroller.update);

  app.delete("/api/product/:id", procontroller.delete);

  //ROUTES ADDRESS

  app.post("/api/address/", addcontroller.create);

  app.get("/api/address", addcontroller.findAll);

  app.get("/api/address/:id", addcontroller.findOne);

  app.put("/api/address/:id", addcontroller.update);

  app.delete("/api/address/:id", addcontroller.delete);

  //ROUTES ORDER

  app.post("/api/order/", ordercontroller.create);

  app.get("/api/order/", ordercontroller.findAll);


  app.put("/api/order/:id", ordercontroller.update);

  app.delete("/api/order/:id", ordercontroller.delete);

  //ROUTES ORDERPRODUCT

  app.post("/api/orderProduct", orderProductcontroller.create);

  app.get("/api/orderProduct", orderProductcontroller.findAll);

  app.get("/api/orderProduct/:id", orderProductcontroller.findOne);

  app.put("/api/orderProduct/:id", orderProductcontroller.update);

  app.delete("/api/orderProduct/:id", orderProductcontroller.delete);

}

