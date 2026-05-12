const express = require("express");
const router = express.Router();

const { createHotel, getHotels, getHotelById, deleteHotel, updateHotel } = require("../controllers/hotel.controller");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

router.get("/", getHotels);
router.get("/:id", getHotelById);

router.post("/", auth, admin, upload.array("images", 5), createHotel);

router.delete("/:id", auth, admin, deleteHotel);

router.put("/:id", auth, admin, updateHotel);

module.exports = router;