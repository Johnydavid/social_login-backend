const { Db } = require("mongodb");
const mongoose = require("mongoose");

const connectDB = () => {
  try {

    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri,{});
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.log(error);
    console.log("Connection Failed");
    process.exit(1)
  }
};

module.exports = connectDB