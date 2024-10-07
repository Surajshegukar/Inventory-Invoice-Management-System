const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://SurajShegukar:iamsuraj2732@cluster0.svo13vm.mongodb.net/ims?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("\n MongoDB Connected ");
    // console.log(connectionInstance);
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};
module.exports = connectDB;
