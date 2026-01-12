const mongoose = require("mongoose");

// Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB")
  .then(() => {
    console.log("Connected to MongoDB");
    return fixAppointments();
  })
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

async function fixAppointments() {
  const db = mongoose.connection.db;
  const appointments = db.collection("appointments");
  
  // Get all appointments
  const allAppointments = await appointments.find({}).toArray();
  console.log(`Found ${allAppointments.length} appointments`);
  
  let updated = 0;
  for (const apt of allAppointments) {
    // Convert doctorid to string if it's an ObjectId
    if (apt.doctorid && typeof apt.doctorid !== 'string') {
      const doctoridString = apt.doctorid.toString();
      await appointments.updateOne(
        { _id: apt._id },
        { $set: { doctorid: doctoridString } }
      );
      updated++;
    }
  }
  
  console.log(`Updated ${updated} appointments`);
  
  // Verify the update
  const sample = await appointments.findOne({});
  if (sample) {
    console.log("Sample appointment doctorid type:", typeof sample.doctorid);
    console.log("Sample doctorid value:", sample.doctorid);
  }
}
