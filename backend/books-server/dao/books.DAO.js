import { validatedbPool } from "../../helpers/dbpool.js";


export default class BooksDAO{
  static async getAllBooksDAO(dbPoolBooks,filters = {}){
    try {
        let query = `SELECT * 
                    FROM campus_textbooks.textbooks
                    LEFT JOIN categories ON textbooks.category_id = categories.category_id
                    WHERE 1=1
                    `; //default query should filters be null;
        const params = []; 

        if(filters.title){
            query += 'AND textbooks.title LIKE ?';
            params.push(`%${filters.title}%`);
        }

        if(filters.category){
            if(Number.isInteger(Number(filters.category))){
                query += 'AND textbooks.category_id = ?';
                params.push(Number(filters.category));
            }else{
                query += 'AND category_name =  ?';
                params.push(filters.category);
            }
          

        }

        //validate db Pool 
        validatedbPool(dbPoolBooks);

        const [result] = await dbPoolBooks.query(query,params);
        const books = result;
        return books;
        

    } catch (error) {
        console.error("Error Fetching books: ", error);
            throw error;
    }
  }


  //get book by Id
  static async getBookByIdDAO(dbPoolBooks,bookId){
    try {

        //validate db Pool 
        validatedbPool(dbPoolBooks);
       
        const [result] = await dbPoolBooks.query('SELECT * FROM textbooks WHERE textbook_id = ?',[bookId])
        const textBook = result[0];

        return textBook;

        
    } catch (error) {
        console.error("Error Fetching a book: ", error);
        throw error;
    }
  }

  //get available categories
  static async getAvailableCategoriesDAO(dbPoolBooks){
    try {
         //validate db Pool 
        validatedbPool(dbPoolBooks);

        const [result] = await dbPoolBooks.query('SELECT * FROM categories');
        
        return result
    } catch (error) {
         console.error("Error Fetching available categories ", error);
         throw error;
    }
  }


  //add new textbook listing
  static async addNewBookDAO(dbPoolBooks,sellerId,title,author,isbn,edition,condition_enum,price,description,category_id){
    try {
        //validate db Pool 
        validatedbPool(dbPoolBooks);

         const [result] = await dbPoolBooks.query('CALL insert_textbook(?,?,?,?,?,?,?,?,?)',[sellerId,title,author,isbn,edition,condition_enum,price,description,category_id]);
      
        return result.affectedRows > 0
    } catch (error) {
         console.error("Error Adding textbook listing ", error);
         throw error;
    }
  };

  //update textbook listing
  static async updateBookDAO(dbPoolBooks,sellerId,textbook_id,fieldsToUpdate){
    try {
     
      //validate db Pool 
      validatedbPool(dbPoolBooks);
      const updateKeys = Object.keys(fieldsToUpdate); //extract keys(title,isbn ...etc) from the fieldsToUpdate object
      
      //check if it's the owner that's making updates
      const [isTheOwner] = await dbPoolBooks.query(`SELECT * FROM textbooks WHERE seller_id = ? AND textbook_id = ?`,[sellerId,textbook_id]);
      
      if(isTheOwner.length === 0){
     
        return isTheOwner;
        
      }


       //UPDATE tableName
       //SET title  = "" ,author = "", ...
       //WHERE textbook_Id = textbook_ID

      //Build  the SET clause
    const setClause = updateKeys.map(key => `${key} = ?`).join(', '); //return a new array which has ' key = ? ,'
    
    //Extract values that corrects to the '?' in the select clause
    const updateValues = updateKeys.map(key => fieldsToUpdate[key])  //returns the value that corresponds with the key (price : 459.99)
  
    //Construct the full query
    const query = `UPDATE textbooks SET ${setClause} WHERE textbook_id = ?`;
    
    //consolidate all the values,first the set values then the Where value(textbook Id);
    const allValues = [...updateValues,textbook_id];
    const [result] = await dbPoolBooks.query(query,allValues);
    

    return result.affectedRows > 0;

    } catch (error) {
      console.error("Error Updating textbook listing ", error);
      throw error;

    }
  }

  //Delete a textbook listing

  static async deleteBookDAO(dbPoolBooks,sellerId,textbookId){
      try {

          //validate db Pool 
          validatedbPool(dbPoolBooks);
         
          
          //check if it's the owner that's deleting
          const [isTheOwner] = await dbPoolBooks.query(`SELECT * FROM textbooks WHERE seller_id = ? AND textbook_id = ?`,[sellerId,textbookId]);
          
          if(isTheOwner.length === 0){
        
            return isTheOwner;
            
          }   
          
          
          const [result] = await dbPoolBooks.query(`CALL delete_textbook(?)`,[textbookId]);
          return result.affectedRows > 0;
        
      } catch (error) {
        console.error("Error Deleting textbook listing ", error);
        throw error;
      }
  }

  static async getUserBooksDAO(dbPoolBooks,userId){
    try {
          //validate db Pool 
          validatedbPool(dbPoolBooks);
            

      const [result] = await dbPoolBooks.query(`SELECT * FROM textbooks WHERE seller_id = ? `,[userId]);
      const books = result;
      return books;
    } catch (error) {
      console.error("Error Getting all user textbooks listings ", error);
      throw error;
    }
  }

}