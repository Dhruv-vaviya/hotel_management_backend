const express = require("express");
const router = express.Router();

const Hotel = require("../models/hotel.model");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

router.get("/stats", auth, admin ,async (req, res) => {
    try {
        const hotels = await Hotel.countDocuments();
        const bookings = await Booking.countDocuments();
        const users = await User.countDocuments();

        res.json({
            hotels,
            bookings,
            users
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;