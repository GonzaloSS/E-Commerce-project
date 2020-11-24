const jwt = require('jsonwebtoken')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const db = require("./app/models");

// explotation time.
db.sequelize.sync();

// development time only. Drop and re-sync db.
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });


app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
  
    if(req.headers.authorization.indexOf('Basic ') === 0){
      // verify auth basic credentials
      const base64Credentials =  req.headers.authorization.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');
  
      req.body.username = username;
      req.body.password = password;
  
      return next();
    }
  
    token = token.replace('Bearer ', '');
    // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        req.token = token;
        next();
      }
    });
  });

require("./app/routes/address.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/orderProduct.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
