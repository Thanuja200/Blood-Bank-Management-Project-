const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const donorRoutes = require("./routes/donorRoutes");

const app = express();
app.use(express.json());
app.use("/api/donors", donorRoutes);
app.use(cors());

mongoose.connect("mongodb+srv://thanujavagu:Thanu2004@cluster0.jhc9n.mongodb.net/Blood?retryWrites=true&w=majority&appName=Cluster0", {
  dbName: "Blood",
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Database Connection Failed:", err));
 
// 🔹 Define Schema & Model
const DoanteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  willingOrNot: { type: Boolean, required: true },
  phoneNumber: { type: Number, required: true },
  AlternatePhoneNumber: { type: Number, required: true },
  Region: { type: String, required: true },
});

const Doante = mongoose.models.Doante || mongoose.model("Doante", DoanteSchema);


// 🔹 POST: Add a Donor
app.post("/api/Doante", async (req, res) => {
  try {
    const { name, bloodGroup, Region, phoneNumber, AlternatePhoneNumber, willingOrNot } = req.body;

    const newDonor = new Doante({
      name,
      bloodGroup,
      Region,
      phoneNumber,
      AlternatePhoneNumber,
      willingOrNot,
    });

    await newDonor.save();
    res.status(201).json({ message: "Donor added successfully" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// 🔹 GET: Fetch All Donors
app.get('/api/Doante/all', async (req, res) => {
  try {
      const data = await Doante.find();  // Fetch data correctly
      res.json(data);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// 🔹 GET: Search Donors by Blood Group & Region
// 🔹 GET: Search Donors by Blood Group or Region (or both)
app.get("/api/Doante/search", async (req, res) => {
  try {
    const { bloodGroup, Region } = req.query;

    // If both are missing, return error
    if (!bloodGroup && !Region) {
      return res.status(400).json({ error: "Please provide at least one search parameter: bloodGroup or Region" });
    }

    // 🔹 Escape regex safely
    const escapeRegex = (text) => text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // 🔍 Build dynamic query
    let query = {};
    if (bloodGroup) {
      query.bloodGroup = { $regex: `^${escapeRegex(bloodGroup)}$`, $options: "i" };
    }
    if (Region) {
      query.Region = { $regex: `^${escapeRegex(Region)}$`, $options: "i" };
    }

    const donors = await Doante.find(query);
    res.json(donors.length > 0 ? donors : []);

  } catch (error) {
    console.error("❌ Search Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
