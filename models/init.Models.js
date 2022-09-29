const { Meal } = require("../models/meal.model");
const { Order } = require("./order.model");
const { Restaurant } = require("./restaurants.model");
const { Review } = require("./review.model");
const { User } = require("./user.model");

const initModels = () => {
  //User 1 <--> M Review
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  //User 1 <--> M Orders
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  //  restaurant 1 <-->  M Review
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  // restaurant 1 <--> M meals
  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);

  // Meal 1 <--> 1 Order

  Meal.hasOne(Order, "mealId");
  Order.belongsTo(Meal);
};

module.exports = { initModels };
