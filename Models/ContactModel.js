import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Please provide user ID"],
        ref:"users"
    },
    name:{
        type:String,
        required:[true,"Please provide the contact name!"]
    },
    email:{
        type:String,
        required:[true,"Please provide the email!"]
    },
    phone:{
        type:String,
        required:[true,"Please provide the contact number!"]
    },
},
{
    timestamps:true
})

const contactModel=mongoose.model("contact",contactSchema)
export default contactModel