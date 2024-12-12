const Shop = require("../models/Shop");

// Create a shop
const createShop = async (req, res) => {
  const {
    shopName,
    ownerName,
    category,
    location,
    rating,
    description,
    contact,
  } = req.body;

  try {
    const shop = new Shop({
      shopName, // Shop name
      ownerName, // Owner's name
      category, // Category (e.g., Electronics)
      location, // Location (e.g., New York)
      rating, // Rating (between 0 and 5)
      description, // Description of the shop
      contact, // Contact information (e.g., phone number)
      createdAt: Date.now(),
    });

    await shop.save();
    res.status(201).json({ message: "Shop created successfully", shop });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all shops
const getShops = async (req, res) => {
  try {
    const shops = await Shop.find(); // Fetch all shops from the database
    res.status(200).json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch a shop by its ID
const getShopById = async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await Shop.findById(id); // Find the shop by ID

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(shop); // Send the shop details as the response
  } catch (error) {
    console.error(error);

    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid shop ID format" });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

// Update a shop by ID
const updateShop = async (req, res) => {
  const { id } = req.params;
  const {
    shopName,
    ownerName,
    category,
    location,
    rating,
    description,
    contact,
  } = req.body;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      id,
      { shopName, ownerName, category, location, rating, description, contact },
      { new: true } // Return the updated shop
    );

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(updatedShop); // Return the updated shop
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a shop by ID
const deleteShop = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShop = await Shop.findByIdAndDelete(id);

    if (!deletedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getShopByName = async (req, res) => {
  const { shopName } = req.params;
  try {
    const shop = await Shop.findOne({ shopName });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createShop,
  getShops,
  getShopById,
  updateShop,
  deleteShop,
  getShopByName
};
