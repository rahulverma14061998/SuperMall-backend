const express = require("express");
const {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
  getShopByName
} = require("../controllers/shopController");

const router = express.Router();
// Public routes

router.get("/", getShops); // View all shops
router.post("/create",  createShop);
router.get("/:id", getShopById); // View a single shop
router.put("/:id", updateShop); // Update shop details by ID
router.delete("/:id", deleteShop); // Delete a shop by ID
router.get("/shopName/:shopName", getShopByName);


module.exports = router;
