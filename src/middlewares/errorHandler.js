// middleware/errorHandler.js

// Centralized error handling middleware. You use this at the end of your middleware stack in app.js:

// const express = require("express");
// const app = express();
// const errorHandler = require("./middlewares/errorHandler");

// // your routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// // ERROR HANDLER (always last)
// app.use(errorHandler);

// module.exports = app;

// Inside errorHandler.js:

// module.exports = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     message: err.message || "Something went wrong",
//   });
// };

//  Benefit:

// You don’t need to try/catch every route.

// Any error throw new Error("...") goes here.