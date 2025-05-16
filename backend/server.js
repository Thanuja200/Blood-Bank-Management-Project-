const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://thanujavagu:Thanu2004@cluster0.jhc9n.mongodb.net/Blood?retryWrites=true&w=majority&appName=Cluster0",
    { dbName: "Blood" }
  )
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

const Doante = mongoose.model("Doante", DoanteSchema);

// 🔹 POST: Add a Donor
app.post('/api/Doante/all', async (req, res) => {
  try {
      const newData = new Doante(req.body); // Create a new Mongoose document
      const result = await newData.save();  // Save to DB
      res.status(201).json({ message: 'Data inserted successfully', data: result });
  } catch (err) {
      res.status(500).json({ error: err.message });
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
app.get("/api/Doante/search", async (req, res) => {
  try {
    const { bloodGroup, Region } = req.query;

    if (!bloodGroup || !Region) {
      console.log("❌ Missing parameters:", req.query);
      return res.status(400).json({ error: "Missing search parameters" });
    }

    console.log("🔎 Searching for:", { bloodGroup, Region });

    // 🔹 Escape Special Characters (like `+`)
    const escapeRegex = (text) => text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    const query = { 
      bloodGroup: { $regex: `^${escapeRegex(bloodGroup)}$`, $options: "i" },  
      Region: { $regex: `^${Region}$`, $options: "i" }
    };

    console.log("📌 Executing Query:", query);

    const donors = await Doante.find(query);
    console.log("✅ Found donors:", donors.length, donors);

    res.json(donors.length > 0 ? donors : []);

  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
