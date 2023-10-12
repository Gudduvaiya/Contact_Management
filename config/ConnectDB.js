import mongoose from "mongoose";

const ConnectDB=async()=>{
    try {
       const connect=await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Connected to DB!",connect.Connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default ConnectDB