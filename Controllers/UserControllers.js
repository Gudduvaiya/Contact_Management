import expressAsyncHandler from "express-async-handler";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// create new user
//POST - api/users/register
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandotory!");
  }

  const isUserAlreadyExists = await UserModel.findOne({ email });
  const isUsernameAlreadyExists = await UserModel.findOne({ username });

  if (isUserAlreadyExists) {
    res.status(401);
    throw new Error("Email alreadey exists!");
  }
  if (isUsernameAlreadyExists) {
    res.status(401);
    throw new Error("username alreadey exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  newUser = newUser.toObject();
  delete newUser.password;
  res.status(200).json(newUser);
});

// login user
//POST - api/users/login
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandotory!");
  }

  const user = await UserModel.findOne({ email });
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (user && comparedPassword) {
    const accessToken = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    res.status(200).json({accessToken,user});
  } else {
    res.status(400);
    throw new Error("Email or Password is not valid!");
  }
});

// login user
//GET - api/users/currentUser
// Private Access
export const currentUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
