import express from "express";
import dotenv from "dotenv"
import router from "./Routes/ContactRoutes.js"
import userRouter from "./Routes/UserRoutes.js"
import { errorHandler } from "./Middleware/errorHandler.js";
import ConnectDB from "./config/ConnectDB.js";
import morgan from "morgan";

dotenv.config()     //for env file. after this we can use env file
const port=process.env.PORT
const app=express()
ConnectDB();

app.use(errorHandler)
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/contacts",router)
app.use("/api/users",userRouter)
app.listen(port,()=>{
    console.log("Listing on port number ",port);
})