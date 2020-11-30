const { sequelize, Sequelize }= require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username:{
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      }/*,
      id_address: {
        type: Sequelize.INTEGER,
        required:true,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }*/
    }, { timestamps: false});
  
    return user;
  };