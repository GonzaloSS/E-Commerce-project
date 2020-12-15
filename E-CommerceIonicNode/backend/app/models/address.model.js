module.exports = (sequelize, Sequelize) => {
    const address = sequelize.define("address", {
      street: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      }
    }, { timestamps: false});
  
    return address;
  };