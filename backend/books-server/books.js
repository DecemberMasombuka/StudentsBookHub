import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import booksRoutes from "./routes/books.route.js"


const app = express();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

app.use(cors(
       {
              origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
       }
));

app.use(express.json());




app.use("/api/v1/bookshub/",booksRoutes);
app.use(/^\/.*/,(req,res) => 
       res.status(404).json({error : "Books URL not found"}));

export default app;