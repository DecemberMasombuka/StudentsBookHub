import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";


const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
})) ;

app.use(express.json());  //For passing JSON request bodies.

app.use('/api/v1/auth', authRoutes); //Mount authentication routes

//undefined routes
app.use(/^\/.*/,(req,res) => {
   res.status(404).json({error: "Auth URL not found"});
})

export default app;
