//General vars
var express = require("express");
var app = express();
var path = require("path");

//Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Port
var port = (process.env.PORT || 5000);
app.set("port", port);
app.listen(app.get("port"), function()
{
  console.log("listening on port: " + app.get("port"));
});

//Mongoose
var mongoose = require("mongoose");
var mongoURI = "mongodb://localhost:27017/realestate";
var mongoDB = mongoose.connect(mongoURI).connection;
mongoDB.on("error", function(err)
{
  console.log("Mongo error " + err);
});
mongoDB.once("open", function()
{
  console.log("Mongo connected.");
});

//Basic page
app.use(express.static("./server/public/"));
app.get("/", function(req, res)
{
  res.sendFile(path.resolve("./server/public/views/index.html"));
});

//Real connecting and displaying
var listings = require("./routes/listings.js");
app.use("/listings", listings);
