const Booking = require("../models/booking.model");

// ✅ CREATE BOOKING
exports.createBooking = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { hotelId, days, totalAmount } = req.body;

        if (!hotelId || !days || typeof totalAmount !== "number" || isNaN(totalAmount)) {
            return res.status(400).json({ message: "Invalid booking data" });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            hotelId,
            days,
            totalAmount,
            status: "pending"
        });
        res.status(201).json(booking);

    } catch (err) {
        console.log("BOOKING ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

// ✅ MARK AS PAID
exports.payBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: "paid" },
            { new: true }
        );

        res.json(booking);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ GET USER BOOKINGS
exports.getMyBookings = async (req, res) => {
    try {
        console.log("USER ID:", req.user?.id); // 👈 IMPORTANT

        const bookings = await Booking.find({ userId: req.user.id })
            .populate("hotelId");

        console.log("FOUND BOOKINGS:", bookings); // 👈 IMPORTANT

        res.json(bookings);

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

// ✅ ADMIN: GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("hotelId")
            .populate("userId", "name email");

        res.json(bookings);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};