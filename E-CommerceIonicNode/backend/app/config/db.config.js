module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "revolution2013",
    DB: "dbecommerce",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };