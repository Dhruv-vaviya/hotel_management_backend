const express = require("express");
const router = express.Router();

const {
    createBooking,
    payBooking,
    getMyBookings,
    getAllBookings
} = require("../controllers/booking.controller");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

// USER
router.post("/", auth, createBooking);
router.get("/me", auth, getMyBookings);
router.put("/pay/:id", auth, payBooking);

// ADMIN
router.get("/", auth, admin, getAllBookings);

router.get("/me", auth, getMyBookings);

module.exports = router;