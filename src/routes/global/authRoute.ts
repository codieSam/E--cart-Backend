import express, { Router } from "express";
import { loginUser, registerUser } from "../../controllers/global/auth/authController";

const router:Router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)



export default router