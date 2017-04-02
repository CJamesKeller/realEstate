$(document).ready(function()
{
  $("#newRentalForm").hide();
  $("#newHouseForm").hide();
  getListings();
  eventListeners();
}); //End of DocReady

//Get Listings
function getListings()
{
  $.ajax(
    {
      type: "GET",
      url: "/listings",
      success: function(res)
      {
        displayListings(res);
      }
    });
}

function displayListings(res)
{
  $("#outputDiv").empty();
  for(var i = 0; i < res.length; i++)
  {
    var listing = res[i];
    $("#outputDiv").append("<div class='col-md-4 listingItemWrapper'></div>");
    var $el0 = $("#outputDiv").children().last();
    if(listing.cost)
    {
      displayingHouse($el0, listing);
    }
    else if(listing.rent)
    {
      displayingRental($el0, listing);
    }
  }
}

function displayingHouse($el0, listing)
{
  $el0.append("<div class='col-md-12 rentalItem'></div>");
  var $el1 = $("#outputDiv").children().children().last();
  $el1.append("<span class='glyphicon glyphicon-home'></span>");

  $el1.append("<div class='row'>" + listing.cost + "</div>");
  $el1.append("<div class='row'>" + listing.sqft + "</div>");
  $el1.append("<div class='row'>" + listing.city + "</div>");
}

function displayingRental($el0, listing)
{
  $el0.append("<div class='col-md-12 houseItem'></div>");
  var $el1 = $("#outputDiv").children().children().last();
  $el1.append("<span class='glyphicon glyphicon-home'></span>");

  $el1.append("<div class='row'>" + listing.rent + "</div>");
  $el1.append("<div class='row'>" + listing.sqft + "</div>");
  $el1.append("<div class='row'>" + listing.city + "</div>");
}

//Event Listeners
function eventListeners()
{
  $("#rentalButton").on("click", function()
  {
    rentalForm();
  });

  $("#houseButton").on("click", function()
  {
    houseForm();
  });

  $("#newRental").on("submit", function(event)
  {
    //Preventing default is key...
    event.preventDefault();
    var newRental = {};
    newRental.rent = $("#rentalPrice").val();
    newRental.sqft = $("#rentalSqft").val();
    newRental.city = $("#rentalCity").val();
    postNewRental(newRental);
  });

  $("#newHouse").on("submit", function(event)
  {
    event.preventDefault();
    var newHouse = {};
    newHouse.cost = $("#housePrice").val();
    newHouse.sqft = $("#houseSqft").val();
    newHouse.city = $("#houseCity").val();
    postNewHouse(newHouse);
  });
}

function rentalForm()
{
  $(".modal-title").text("Add New Rental");
  $("#houseButton").show();
  $("#newHouseForm").hide();
  $("#rentalButton").hide();
  $("#newRentalForm").show();
}

function houseForm()
{
  $(".modal-title").text("Add New House");
  $("#rentalButton").show();
  $("#newRentalForm").hide();
  $("#houseButton").hide();
  $("#newHouseForm").show();
}

function postNewRental(newRental)
{
  console.log("running POST with: " + newRental);
  $.ajax(
    {
      type: "POST",
      url: "listings/new-rental",
      data: newRental,
      success: function(res)
      {
        getListings(res);
      }
    });
}

function postNewHouse(newHouse)
{
  console.log("running POST with: " + newHouse);
  $.ajax(
    {
      type: "POST",
      url: "listings/new-house",
      data: newHouse,
      success: function(res)
      {
        getListings(res);
      }
    });
}
