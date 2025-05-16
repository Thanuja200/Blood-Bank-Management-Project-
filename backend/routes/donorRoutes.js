const express = require("express");
const { addDoante, getDoante, searchDoante } = require("../controllers/donorController");

const router = express.Router();

router.post("/add", addDoante);
router.get("/all", getDoante);
router.get("/search", searchDoante);

module.exports = router;
