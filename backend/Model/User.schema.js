const { DataTypes } = require("sequelize");
const seq = require("../Connection/connection");

const UserModel = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await seq.sync();
})();

module.exports = { UserModel };
