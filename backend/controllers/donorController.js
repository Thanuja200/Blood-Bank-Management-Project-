const Doante = require("../models/donorModel");

// ➤ Add a new donor
const addDoante = async (req, res) => {
  try {
    const newDoante = new Doante(req.body);
    await newDoante.save();
    res.status(201).json({ message: "Donor added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ➤ Get all donors
const getDoante = async (req, res) => {
  try {
    const Doante = await Doante.find();
    res.json(Doante);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ➤ Search donors by Blood Group & Region
const searchDoante = async (req, res) => {
  try {
    const { bloodGroup, Region } = req.body;
    console.log("Searching for:", bloodGroup, Region); // Debugging Log

    const Doante = await Doante.find({ bloodGroup, Region });

    console.log("API Response:", Doante); // Debugging Log
    res.json(Doante);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addDoante, getDoante, searchDoante };
