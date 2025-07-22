import authDAO from "../dao/auth.DAO.js"
import dotenv from "dotenv";
dotenv.config();
import { getdbPool } from "../../helpers/dbpool.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION = '1h';
const dbPoolName = 'dbPoolAuth';


//register
export const register = async (req,res) =>{

    try {
        //getdbpool
         const dbPoolAuth  = getdbPool(req,dbPoolName);
       
        const {username,email,password,confirmPassword,phoneNumber,campusLocation} = req.body;
        //validation
        if(!username){ return res.status(400).json({error:"Username is required"})};
        if(!password){ return res.status(400).json({error:"Password is required"})};
        if(!email){ return res.status(400).json({error:"email is required"})};
        if(!phoneNumber){ return res.status(400).json({error:"Phone nmber is required"})};
        if(!campusLocation){ return res.status(400).json({error:"Campus location is required"})};
        if(confirmPassword  !==  password){ return res.status(400).json({error:"Passwords do not match"})};
         
        //Hash passworrd
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);
        
        //Query the database
        const userInsertId = await authDAO.registerDAO(dbPoolAuth,username,email,hashedPassword,phoneNumber,campusLocation);
        //check for successful insertion
        if(userInsertId){
            
            //create payload and token
            const payload = {
                userId : userInsertId,
            };

            const token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn: JWT_EXPIRATION});

            res.status(201).json({message: "User registered successfully",token: token})
        }

    } catch (error) {
        console.error(`Registration error ${error}`);
        res.status(500).json({error : error.message || "Server error during registration"})
    }
}


//login
export const login = async (req,res) =>{

    try {
        //getdbpool
         const dbPoolAuth  = getdbPool(req,dbPoolName);
        const  {username,password} = req.body;

        //validation
        if(!username || !password){ return res.status(400).json({error:"Username/password is required"})};
         
        const user = await authDAO.loginDAO(dbPoolAuth,username);
        //console.log(user);
        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }

       const isMatch = await bycrypt.compare(req.body.password,user.password_hash);
       if(!isMatch){
        return res.status(401).json({message: 'Invalid credentials'});
       }
       if(isMatch){

        const token = jwt.sign({
            userId : user.user_id,
            username : user.username
        },JWT_SECRET_KEY,{expiresIn: JWT_EXPIRATION});

        res.status(201).json({message: "User logged-in successfully",token: token})
       }


    } catch (error) {
        console.error(`Login error ${error}`);
        res.status(500).json({error : error.message || "Server error during login"})
    }
}

