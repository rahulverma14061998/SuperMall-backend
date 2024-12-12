const express = require("express");
const { filterAndSortProducts } = require("../controllers/filterController");

const router = express.Router();

// Filter and sort products route
router.get("/filter", filterAndSortProducts);

module.exports = router;
