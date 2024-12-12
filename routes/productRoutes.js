const express = require("express");
const {
  createProduct,
  getProductsByShop,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductByName
} = require("../controllers/productController");

const router = express.Router();


// Product Routes
router.get("/", getAllProducts); // Get all products
router.post("/createProduct",createProduct); // Create a new product with image
router.get("/:shop", getProductsByShop); // Get all products for a shop
router.put("/:id", updateProduct); // Update a product by ID
router.delete("/:id", deleteProduct); // Delete a product by ID
router.get("/name/:name", getProductByName);
router.get("/:id", getProductById); // Get a product by ID

module.exports = router;
