//General vars
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

//Mongo/Mongoose Schemas
var AnySchema = mongoose.Schema(
  {
  sqft : Number,
  city : String
  });
var AnyListing = mongoose.model("anyListing", AnySchema, "listings");

var RentalSchema = mongoose.Schema(
  {
  rent : Number,
  sqft : Number,
  city : String
  });
var Rental = mongoose.model("rentals", RentalSchema, "listings");

var HouseSchema = mongoose.Schema(
  {
  cost : Number,
  sqft : Number,
  city : String
  });
var House = mongoose.model("houses", HouseSchema, "listings");

//GET function
router.get("/", function(req, res)
{
  AnyListing.find(function(err, allListings)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.send(allListings);
    }
  });
});

//POST functions
router.post("/new-rental", function(req, res)
{
  var newListing = new Rental();
  newListing.rent = req.body.rent;
  newListing.sqft = req.body.sqft;
  newListing.city = req.body.city;
  newListing.save(function(err, savedRental)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.send(savedRental);
    }
  });
});

router.post("/new-house", function(req, res)
{
  var newListing = new House();
  newListing.cost = req.body.cost;
  newListing.sqft = req.body.sqft;
  newListing.city = req.body.city;
  newListing.save(function(err, savedHouse)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.send(savedHouse);
    }
  });
});

module.exports = router;
