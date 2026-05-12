const Room = require("../models/room.model");


exports.createRoom = async (req, res) => {
    try {
        const { hotelId, type, price, capacity, totalRooms } = req.body;

        if (!hotelId || !type || !price || !capacity || !totalRooms) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const room = await Room.create({
            hotelId,
            type,
            price,
            capacity,
            totalRooms
        });

        res.status(201).json(room);

    } catch (err) {
        console.log("CREATE ROOM ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};


exports.getRoomsByHotel = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await Room.findByIdAndDelete(id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.json({ message: "Room deleted successfully" });

    } catch (err) {
        console.log("DELETE ROOM ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};