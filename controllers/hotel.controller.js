const hotelModel = require("../models/hotel.model");
const cloudinary = require("../config/cloudinary");

exports.createHotel = async (req, res) => {
    try {
        const { name, location, price, description } = req.body;


        if (!name || !location || !price) {
            return res.status(400).json({ message: "Name, location, and price required" });
        }

        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => file.path);
        }

        const hotel = await hotelModel.create({
            name,
            location,
            description,
            price,
            images: imageUrls
        });
        
        res.status(201).json(hotel);

    } catch (err) {
        console.log("CREATE HOTEL ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getHotels = async (req, res) => {
    try {
        const { location, page = 1 } = req.query;

        let filter = {};

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        const limit = 5;
        const skip = (page - 1) * limit;

        const hotels = await hotelModel.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await hotelModel.countDocuments(filter);

        res.json({
            total,
            page: Number(page),
            hotels
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json(hotel);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        const hotel = await hotelModel.findByIdAndDelete(id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json({ message: "Hotel deleted successfully" });

    } catch (err) {
        console.log("DELETE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateHotel = async (req, res) => {
    try {
        const { id } = req.params;

        const hotel = await hotelModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json({
            message: "Hotel updated successfully",
            hotel
        });

    } catch (err) {
        console.log("UPDATE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};