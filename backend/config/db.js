const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mdaabidkhan28_db_user:3fTbPd78RxlqjJE3@cluster0.xig1bxy.mongodb.net/hospitalDB", {
      // Options to prevent schema validation issues
      bufferCommands: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;