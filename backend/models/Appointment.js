const mongoose = require("mongoose");

// Clear any existing Appointment model to avoid conflicts with cached schemas
if (mongoose.models.Appointment) {
  delete mongoose.models.Appointment;
}

const appointmentSchema = new mongoose.Schema({
  patiantname: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  doctorid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Confirmed",
  },
}, { 
  timestamps: true,
  // Disable strict mode to handle existing documents with different structure
  strict: false
});

// Ensure no virtuals or methods reference Doctor model
appointmentSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

// Export model
const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = AppointmentModel;
