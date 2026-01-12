// Quick test script to check if the route works
const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("./models/Appointment");

const testSearch = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB");
    console.log("Connected to MongoDB");
    
    // Test query
    const result = await Appointment.find({}).limit(1);
    console.log("Test query successful, found:", result.length, "appointments");
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

testSearch();
