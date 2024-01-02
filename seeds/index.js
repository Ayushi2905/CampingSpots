const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ayushisinha440:l7YymDOogjeHh6fS@yelp-cluster.9vo69ny.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//mongoose.connect("mongodb://127.0.0.1/test");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //your user id
      author: "658fe70c0756009dfde262d8",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      //image: "https://source.unsplash.com/collection/483251",
      description:
        "camping ventures are the best kinda experiences for nature lovers!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgmccrols/image/upload/v1704018175/CampSpots/ty4vrn0wful3wo2bnjtx.jpg",
          filename: "CampSpots/ty4vrn0wful3wo2bnjtx",
        },
        {
          url: "https://res.cloudinary.com/dgmccrols/image/upload/v1704018179/CampSpots/xgr6hv8wdryigyndojew.jpg",
          filename: "CampSpots/xgr6hv8wdryigyndojew",
        },
      ],
    });
    await camp.save();
  }
  // const c = new Campground({ title: "purple field" });
  // await c.save();
  //};
};

seedDB().then(() => {
  mongoose.connection.close();
});
