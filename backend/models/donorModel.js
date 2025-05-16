const mongoose = require("mongoose");

const DoanteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  Region: { type: String, required: true },  // Ensure case matches
  phoneNumber: { type: String, required: true },
  AlternatePhoneNumber: { type: String, required: true },  // Ensure case matches
  willingOrNot: { type: Boolean, required: false }
});

const Doante = mongoose.model("Doante", DoanteSchema);
module.exports = Doante;    
