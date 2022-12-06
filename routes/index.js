const express = require("express");
const router = express.Router();
var db = require("../modules/method");
var jwtHelper = require("../modules/jwtHelper");
const { verifyAccessToken } = require("../modules/jwtHelper");

router.get("/", (req, res) => {
  res.send("Welcome to the Project");
  console.log("hello");
});

router.get("/users/login", function (req, res) {
  res.render("login", {title:'Login', error:null});
});

router.get("/users/signup", function (req, res) {
  res.render("signup", {title:'Signup', error:null});
});

router.post("/newUser",async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  if(username != '' && password != '' && confirmPassword != ''){
    if(confirmPassword == password){
      let output = await db.addUser(username,password);
      if(output == true){
        res.render('login', {title:'Login', error:"Please login with your new account"}); 
      }else{
        res.render('signup', {title:'Signup', error:"User already Exists!!"});
      }
    } else{
      res.render('signup', {title:'Signup', error:"Passwords dosen't match. Please check the Passwords!!"});
    }
  }else{
    res.render('signup', {title:'Signup', error:"All fields are required. Please check and try again!!"});
  }
});

router.post("/validateUser",async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if(username != '' && password != ''){
    let output = await db.validateUser(username,password);
    if(output == true){
      const accessToken = await jwtHelper.signAccessToken(username)
      res.send(accessToken); 
    }else{
      res.render('login', {title:'Login', error:"Invalid Login"});
    }
  }else{
    res.render('login', {title:'Login', error:"All fields are required. Please check and try again!!"});
  }
});

router.get("/api/restaurants", verifyAccessToken, async function (req, res) {
  let output = await db.getAllRestaurants();
  //console.log(output)
  res.send(output);
});

router.get("/api/restaurants/:restaurant_id", async function (req, res) {
  let id = req.params.restaurant_id;
  let output = await db.getRestaurantById(id);
  //console.log(output)
  res.send(output);
});

router.get("/restaurants/search",function (req, res) {
  res.render("form");
});

router.post("/restaurants/search", async (req, res) => {
  let page = req.body.page;
  let perPage = req.body.perPage;
  let borough = req.body.borough;
  let output = await db.getRestaurantByFilter(page, perPage, borough);
  res.render("formdata", { data: output });
});

router.get("/api/restaurants/:page/:perPage:/:borough", async function (req, res) {
    let page = req.query.page;
    let perPage = req.query.perPage;
    let borough = req.query.borough;
    console.log(page);
    console.log("---------");
    console.log(perPage);
    console.log("---------");
    console.log(borough);
    let output = await db.getRestaurantByFilter(page, perPage, borough);
    res.send(output);
  }
);

router.post("/api/restaurants", async function (req, res) {
  //console.log(7);
  var data = {
    address: {
      building: req.body.building,
      coord: req.body.coord,
      street: req.body.street,
      zipcode: req.body.zipcode,
    },
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    grades: {
      date: req.body.date,
      grade: req.body.grade,
      score: req.body.score,
    },
    name: req.body.name,
    restaurant_id: req.body.restaurant_id,
  };
  let output = await db.addNewRestaurant(data);
  res.send(output);
});

router.put("/api/restaurants/:restaurant_id", async function (req, res) {
  let id = req.params.restaurant_id;
  var data = {
    address: {
      building: req.body.building,
      coord: req.body.coord,
      street: req.body.street,
      zipcode: req.body.zipcode,
    },
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    grades: {
      date: req.body.date,
      grade: req.body.grade,
      score: req.body.score,
    },
    name: req.body.name,
    restaurant_id: req.body.restaurant_id,
  };
  let result = await db.updateRestaurantByID(data, id);
  console.log(result);
  res.send(result);
});

router.delete("/api/restaurants/:restaurant_id", async function (req, res) {
  let id = req.params.restaurant_id;
  let result = await db.deleteRestaurantByID(id);
  if (result) {
    res.send("Restaurant Deleted");
  } else {
    console.log("Restaurant not deleted");
  }
});
module.exports = router;
