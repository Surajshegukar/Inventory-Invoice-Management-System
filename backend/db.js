const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log("\n MongoDB Connected ");
    // console.log(connectionInstance);
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};
module.exports = connectDB;
