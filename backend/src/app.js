import express from "express";
const app = express();
import connectBD from "../config/database.js"
import authRouter from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
// import morgan from "morgan";

// import cors from "cors";
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
    
// }));
app.use(cookieParser());
app.use("/api/auth", authRouter);

connectBD();


export default app;

