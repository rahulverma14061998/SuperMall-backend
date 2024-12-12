const mongoose = require("mongoose");
const fs = require("fs");
const Shop = require("../models/Shop");

// MongoDB connection string
const mongoURI =
  "mongodb+srv://supermallwebapp:Rahul%40123@super-mall-cluster.dzk0y.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Read data from Shop.json
const uploadData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("Shop.json", "utf-8"));
    await Shop.insertMany(data);
    process.exit(); // Exit the process after upload
  } catch (err) {
    console.error("Error uploading data:", err.message);
    process.exit(1);
  }
};

// Start the upload process
uploadData();
