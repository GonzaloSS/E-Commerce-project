const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

////////////////////////////////////////



db.user = require("./user.model.js")(sequelize, Sequelize);
db.address = require("./address.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderProduct = require("./orderProduct.model.js")(sequelize, Sequelize);


///Associations///

//Foreign Key for user's table//
db.address.hasMany(db.user, {as: 'users', foreignKey: 'id_address'});
////////////////////////////////

//Foreign Key for order's table//
db.user.hasMany(db.order, {as: 'orders', foreignKey: 'id_user'});
////////////////////////////////

//Foreign Key for orderProducts's table//
db.products.hasMany(db.orderProduct, {as: 'orderproducts', foreignKey: 'id_product'});
db.order.hasMany(db.orderProduct, {as: 'orderproducts', foreignKey: 'id_order'});
////////////////////////////////

module.exports = db;