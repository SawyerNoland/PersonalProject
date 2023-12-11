const express = require("express");
const productsRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../db");

// GET route for products DB
productsRouter.get("/", async (req, res, next) => {
  try {
      const products = await getAllProducts();
      console.log(products);
      res.send(products);
  } catch (error) {
      next(error);  // Send the error to the error-handling middleware
  }
});


// GET route for single product in DB by ID
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// POST route for new product in DB
productsRouter.post("/", async (req, res, next) => {
  const { title, manufacturer, price, description, img = "" } = req.body;

  const postProduct = {};

  try {
    postProduct.title = title;
    postProduct.manufacturer = manufacturer;
    postProduct.price = price;
    postProduct.description = description;
    postProduct.img = img;

    const product = await createProduct(postProduct);

    if (product) {
      res.send(product);
    } else {
      next({
        name: "productCreationError",
        message:
          "There was an error creating your product post. Please try again.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH route for exisiting product in DB
productsRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, price, manufacturer, description, img } = req.body;

  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }

  if (price) {
    updateFields.price = price;
  }

  if (manufacturer) {
    updateFields.manufacturer = manufacturer;
  }

  if (description) {
    updateFields.description = description;
  }

  if (img) {
    updateFields.img = img;
  }

  try {
    const originalProduct = await getProductById(id);
    console.log(originalProduct.id, id);
    if (originalProduct.id == id) {
      const updatedProduct = await updateProduct(id, updateFields);
      res.send({ post: updatedProduct });
    } else {
      next({
        name: "Error",
        message: "Cannot update product",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE route for existing product in the DB
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
