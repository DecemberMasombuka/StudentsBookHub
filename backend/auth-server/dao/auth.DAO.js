import { validatedbPool } from "../../helpers/dbpool.js";

export default class AuthDAO{
    static async registerDAO(dbPoolAuth,username,email,password,phoneNumber,campusLocation){
        try {

                  //validate db Pool 
                    validatedbPool(dbPoolAuth);

                    const [result] = await dbPoolAuth.query('INSERT INTO users (username,email,password_hash,phone_number,campus_location) VALUES (?,?,?,?,?)',[username,email,password,phoneNumber,campusLocation]);
                    
                    const userInsertId = result.insertId;
                    return userInsertId;
            
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY'){
                if(err.message.includes('users.username')){
                    throw new Error('Username already exists');
                }else if(err.message.includes('email')){
                    throw new Error('Email already exists');
                }
            }
            throw err;
        }
    }


    //login

    static async loginDAO(dbPoolAuth,username){

        try {

          //validate db Pool 
           validatedbPool(dbPoolAuth);

            const [result] = await dbPoolAuth.query('SELECT * FROM users WHERE username = ?',[username]);
            console.log(result[0]);
            const user = result[0]; //get the first object from the returned array of objects
            return user;

        } catch (error) {
            console.error("Error Logging-in user:", error);
            throw error;
        }
    }
}

