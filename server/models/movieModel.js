import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
    {
        title:[{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Genre" 
        }],
        genre: [{ 
            type: String, 
            required: true 
        }], 
        releaseDate: {
            type: Date, 
            required: true 
        },
        director: { 
            type: String, 
            required: true 
        },
        duration: { 
            type: Number, 
            required: true 
        }, 
        description: { 
            type: String 
        },
        posterUrl: { 
            type: String 
        },
        trailerUrl: { 
            type: String 
        },
        averageRating: { 
            type: Number, 
            default: 0 
        },
        ratingCount: { 
            type: Number, 
            default: 0 
        },
    },
    {
        timestamps:true
    }
)

export const Movie = mongoose.model("Movie", movieSchema);