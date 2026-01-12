const express = require("express");
const router = express.Router();

// Placeholder route for doctors
// This can be implemented later when doctor management is needed
router.get("/", (req, res) => {
  res.json({ message: "Doctor routes - to be implemented" });
});

module.exports = router;
