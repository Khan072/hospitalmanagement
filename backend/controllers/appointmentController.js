const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

exports.bookAppointment = async (req, res) => {
    try {
        const {
            patiantname,
            phoneNo,
            doctorid,
            date,
            time,
        } = req.body;

        // Validate doctorid is not empty (accepts any string format)
        if (!doctorid || typeof doctorid !== 'string' || doctorid.trim() === '') {
            return res.status(400).json({
                message: "Invalid doctor ID format"
            });
        }

        const exists = await Appointment.findOne({
            doctorid,
            phoneNo,
            date,
            time
        });
        
        if (exists) {
            return res.status(400).json({
                message: "This time slot is already booked"
            });
        }
        
        const create = await Appointment.create({
            patiantname,
            phoneNo,
            doctorid,
            date,
            time,
        });
        
        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: create
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}