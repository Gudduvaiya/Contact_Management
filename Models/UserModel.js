import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: [true, "Username already exists!"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email!"],
      unique: [true, "email already exists!"],
    },
    password: {
      type: String,
      required: [true, "Please provide the password!"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("users", userSchema);
export default UserModel;
