import express from "express";
import {register, login} from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);


//logout and password
/* router.post('logout',logout);
router.post('forgot-password',forgotPassword); */

export default router;