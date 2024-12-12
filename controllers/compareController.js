const Product = require("../models/Product");

// Compare two products by their IDs
const compareProducts = async (req, res) => {
  const { productNames } = req.body; // Array of product IDs
  if (!Array.isArray(productNames) || productNames.length !== 2) {
    return res
      .status(400)
      .json({ message: "Please provide exactly two names" });
  }

  try {
    const products = await Product.find({ name: { $in: productNames } });

    if (products.length !== 2) {
      return res
        .status(404)
        .json({ message: "One or both products not found" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  compareProducts,
};
