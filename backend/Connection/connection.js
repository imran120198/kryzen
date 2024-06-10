const { Sequelize } = require("sequelize");
require("dotenv").config();

const seq = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
  }
);

seq
  .authenticate()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = seq;
