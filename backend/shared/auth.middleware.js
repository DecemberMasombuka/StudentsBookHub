import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
//Authentication middleware
export const authenticateJWT = (req,res,next) =>{
   
    const authHeader = req.headers['authorization'];
    
    const token = authHeader &&  authHeader.split(' ')[1];
    if(!token){
           return res.send(401);
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, username )=>{
           if(err){
                  return res.send(403);
           }

           req.username = username //stores the decoded token(user inform) for later usage
           console.log(req.username);
           next(); //tells express to move to the next middleware(routes) in the chain

    })
}