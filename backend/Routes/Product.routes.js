const { Router } = require("express");
const { ProductModel } = require("../Model/Product.schema");

const ProductRouter = Router();

// Get all product data
ProductRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get products by user ID
ProductRouter.get("/myproduct", async (req, res) => {
  try {
    const products = await ProductModel.findAll({
      where: { user_id: req.userID },
    });
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Create a new product
ProductRouter.post("/create", async (req, res) => {
  try {
    const { name, description, price, image, product_type } = req.body;
    const product = await ProductModel.create({
      name,
      description,
      price,
      image,
      product_type,
      user_id: req.userID,
    });
    res.status(201).send({ message: "Product created successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Edit a product by ID
ProductRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, product_type } = req.body;

    const product = await ProductModel.findOne({
      where: { id, user_id: req.userID },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.product_type = product_type;

    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete product by ID
ProductRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findOne({
      where: { id, user_id: req.userID },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await product.destroy();
    res.send("Product deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = {
  ProductRouter,
};
