import express from "express";
import {loginUser,registerUser,currentUser} from "../Controllers/UserControllers.js"
import { ValidateToken } from "../Middleware/validateTokenHandler.js";
const router=express.Router()
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/currentUser").get(ValidateToken, currentUser);

export default router