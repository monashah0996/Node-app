const express = require("express");
const mongoose = require("mongoose");
const process = require("process");
const app = express({ extended: true });
var bodyParser = require("body-parser");
const restaurant = require("../models/restaurant");
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

var Restaurants;

function initialize(url) {
  console.log(url);
  mongoose.connect(url);
  const database_status = mongoose.connection;
  database_status.on("error", (error) => console.log(error));
  database_status.once("open", () => console.log("Connected to Mongoose"));
  Restaurants = require("../models/restaurant");
}

async function getAllRestaurants() {
  try {
    //console.log('3')
    let result = await Restaurants.find();
    //console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getRestaurantById(id) {
  try {
    //console.log('5')
    let result = await Restaurants.findById(id);
    //console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getRestaurantByFilter(page, perPage, borough) {
  try {
    //console.log('6')
    let result = await Restaurants.find({ borough: { $eq: borough } })
      .sort({ restaurant_id: 1 })
      .skip(page * perPage)
      .limit(perPage)
      .exec();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addNewRestaurant(data) {
  try {
    //console.log('7')
    await Restaurants.create(data);
    let result = await Restaurants.find({ name: { $eq: data.name } });
    //console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function updateRestaurantByID(data, id) {
  try {
    let result = await Restaurants.findByIdAndUpdate(id, data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteRestaurantByID(id) {
  await Restaurants.remove({
    _id: id,
  });
  return true;
}

module.exports.initialize = initialize;
module.exports.getAllRestaurants = getAllRestaurants;
module.exports.getRestaurantById = getRestaurantById;
module.exports.getRestaurantByFilter = getRestaurantByFilter;
module.exports.addNewRestaurant = addNewRestaurant;
module.exports.updateRestaurantByID = updateRestaurantByID;
module.exports.deleteRestaurantByID = deleteRestaurantByID;
