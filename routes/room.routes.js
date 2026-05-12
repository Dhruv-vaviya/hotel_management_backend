const express = require("express");
const router = express.Router();
const { createRoom , getRoomsByHotel, deleteRoom, updateRoom} = require("../controllers/room.controller")
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

router.post("/", auth, admin , createRoom);
router.delete("/:id", auth, admin, deleteRoom);
router.put("/:id", auth, admin, updateRoom);

router.get("/", getRoomsByHotel);

module.exports = router;