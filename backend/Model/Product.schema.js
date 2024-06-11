const { DataTypes } = require("sequelize");
const seq = require("../Connection/connection");
const { UserModel } = require("./User.schema");

const ProductModel = seq.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

ProductModel.belongsTo(UserModel, { foreignKey: "user_id" });

(async () => {
  await seq.sync();
  console.log("All models were synchronized successfully.");
})();

module.exports = { ProductModel };
