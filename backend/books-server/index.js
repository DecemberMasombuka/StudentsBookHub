import app from "./books.js"; 
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();


const port = parseInt(process.env.PORT || 3000, 10); 
const dbPoolBooks = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERN,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10), // Ensure port is a number
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//mount dbpool connection to the Express app
app.set('dbPoolBooks',dbPoolBooks);

 app.listen(port, () => {
        console.log(`Books Server connected on port ${port}`);
 });

