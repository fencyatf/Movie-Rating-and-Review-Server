import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        profilePic: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRxkIyitXb_MFEFrtxFQGt7nfPoT4LrgH-g&s",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        resetToken: {
            type: String,
        },
        tokenExpiry: {
            type: Date,
        },
        watchlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie", // Assuming you have a "Movie" model
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
