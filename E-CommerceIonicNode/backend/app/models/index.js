const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.address = require("./address.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderProduct = require("./orderProduct.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

///Associations///

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.address.hasOne(db.user, {
  through: "user",
  foreignKey: 'id_address'
});

db.ROLES = ["user", "admin", "moderator"];


db.order.hasOne(db.orderProduct, {
  through: 'orderproducts',
  foreignKey: 'id_order'
});

db.user.hasOne(db.order, {
  through: 'orders',
  foreignKey: 'id_user'
});

db.user.hasOne(db.order, {
  through: 'orders',
  foreignKey: 'id_user'
});

db.products.hasOne(db.orderProduct, { 
  through: 'orderproducts', 
  foreignKey: 'id_product' });

/////////////////////////////////////


module.exports = db;
