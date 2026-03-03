require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

// route files
const authRoutes = require("./src/features/auth/routes/authRoutes");

const app = express();
app.use(cors({ 
  origin: "http://localhost:5173", //for frontend url
  credentials: true // if you using cookies
}));

// middlewarre to parse json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
