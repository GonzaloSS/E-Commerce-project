module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    lastName:{
      type: Sequelize.STRING
    },
    id_address:{
      type: Sequelize.INTEGER
    }
    
  });

  return User;
};
