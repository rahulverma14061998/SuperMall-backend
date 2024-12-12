const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const shopRoutes = require("./routes/shopRoutes");
const authRoutes = require("./routes/authRoutes");
const compareRoutes = require("./routes/compareRoutes");
const filterRoutes = require("./routes/filterRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the shop routes
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/filter", filterRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
