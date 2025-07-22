import app from "./auth.js"; 
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();



const port = parseInt(process.env.AUTH_PORT || 5000, 10); 
const dbPoolAuth = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERN,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


//attach dpPool to the express app to be used anywhere.
app.set('dbPoolAuth',dbPoolAuth);

 app.listen(port, () => {
        console.log(`Auth Server connected on port ${port}`);
 });
