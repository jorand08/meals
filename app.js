const express = require("express");

//Routers
const { usersRouter } = require("./routes/users.route");
const { restaurantRouter } = require("./routes/restaurant.route");
const { reviewRouter } = require("./routes/review.route");

//controllers
const { globalErrorHandler } = require("./controllers/error.controller");
// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/restaurants", reviewRouter);

// Global error handler
app.use(globalErrorHandler);

//Catch non-existing endpoints -- preguntar!
app.all("*", (req, res) => {
  res.status(404).json({
    status: "Error",
    message: `${req.method} ${req.url} does not exists ir our server`,
  });
});

module.exports = { app };
