import { connect } from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
//console.log("Loaded MONGO_URI:", MONGO_URI);

export const connectDB = async() =>{
    try {
        const response = await connect(MONGO_URI); 
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error)
    }
}