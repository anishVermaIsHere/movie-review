import express from "express";
import {config} from 'dotenv';
config();
import cors from "cors";
import reviewRouter from "./config/routes/review.js";
import { dbConnection } from "./config/dbconnect.js";

const app = express();
app.use(cors({
    origin: '*', // * -not recommended just use for demo
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true            
}));
app.use(express.json());


app.use("/api/v1/reviews", reviewRouter);
app.use("/", (req, res) => res.json({message: "Hi, this is a Movie Review Server"}));


app.listen(process.env.SERVER_PORT||5000,()=>{
    console.log(`***** Server started on port ${process.env.SERVER_PORT} ***** `);
})
dbConnection();

