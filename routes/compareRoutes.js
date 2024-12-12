const express = require("express");
const { compareProducts } = require("../controllers/compareController");

const router = express.Router();

// Product Comparison Route
router.post("/compare", compareProducts);

module.exports = router;
