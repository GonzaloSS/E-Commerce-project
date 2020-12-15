module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define("products", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      taxRate: {
        type: Sequelize.STRING
      },
      image:{
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      }
      
    }, { timestamps: false});
  
    return products;
  };