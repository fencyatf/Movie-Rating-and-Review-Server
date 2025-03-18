import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; 

// Configure Multer to upload directly to Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  
    params: {
        folder: "profile_pictures",
        format: "jpg",
    },
});

export const upload = multer({ storage });
