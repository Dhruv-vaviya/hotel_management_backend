const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    type: {
        type: String,
        enum: ["single", "double", "deluxe", "suite"],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    totalRooms: {
        type: Number,
        required: true,
        min: 1
    },
    availableRooms: {
        type: Number,
        default: function () {
            return this.totalRooms;
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);