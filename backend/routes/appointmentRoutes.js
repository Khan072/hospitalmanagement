const express = require("express");
const Appointment = require("../models/Appointment");
const { bookAppointment } = require("../controllers/appointmentController");
const router = express.Router();


router.post("/book", bookAppointment);


router.get("/", async (req, res) => {
  try {
 
    const data = await Appointment.find().sort({ date: 1, time: 1 }).lean();
    console.log(`Total appointments in database: ${data.length}`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/search", async (req, res) => {
  try {
    const { patiantname, phoneNo } = req.query;

    if (!patiantname || !phoneNo) {
      return res.status(400).json({
        message: "Patient name and phone number are required"
      });
    }

    const name = patiantname.trim();
    const phone = phoneNo.trim();

    if (!phone.startsWith("+")) {
      return res.status(400).json({
        message: "Phone number must start with + (country code)"
      });
    }

 
    const appointments = await Appointment.find({
      patiantname: name,   // exact name
      phoneNo: phone       // exact phone WITH +
    })
      .select("patiantname phoneNo doctorid date time status createdAt")
      .lean();

    return res.json(appointments);

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

module.exports = router;
