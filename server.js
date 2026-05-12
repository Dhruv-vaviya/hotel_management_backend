const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { default: helmet } = require("helmet")

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const hotelRoutes = require("./routes/hotel.routes");
const roomRoutes = require("./routes/room.routes");
const bookingRoutes = require("./routes/booking.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));app.use(express.json());
app.use(cookieParser());
app.use(helmet());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


