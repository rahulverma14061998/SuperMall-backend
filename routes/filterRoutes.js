const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { filterAndSortProducts } = require("../controllers/filterController");

const router = express.Router();

// Filter and sort products route
router.get("/filter", filterAndSortProducts);

module.exports = router;
