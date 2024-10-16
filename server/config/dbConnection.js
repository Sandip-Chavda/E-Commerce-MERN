const mongoose = require("mongoose");
require("dotenv").config();

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DataBase successfully!");
  } catch (error) {
    console.error("DataBase connection error:", error);
  }
};

module.exports = ConnectToDB;
