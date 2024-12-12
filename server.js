const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const Razorpay = require("razorpay");

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

// Razorpay
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_KEY_SECRET",
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body; // Amount in paise (e.g., ₹100 = 10000)

  try {
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
app.listen(PORT)
