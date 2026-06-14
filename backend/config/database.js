import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB");
    })
}

export default connectDB;