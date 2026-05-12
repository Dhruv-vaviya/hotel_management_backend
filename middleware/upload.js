// const multer = require("multer");
// const cloudinaryStorage = require("multer-storage-cloudinary");
// const CloudinaryStorage = cloudinaryStorage.CloudinaryStorage;

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "lankastay",
//         allowed_formats: ["jpg", "png", "jpeg"],
//     },
// });

// const upload = multer({ storage });

// module.exports = upload;





const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const CloudinaryStorage = cloudinaryStorage.CloudinaryStorage;
const cloudinary = require("../config/cloudinary"); // ← ADD THIS

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "lankastay",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

module.exports = upload;