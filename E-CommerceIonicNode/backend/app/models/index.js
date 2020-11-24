'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
        db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


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
