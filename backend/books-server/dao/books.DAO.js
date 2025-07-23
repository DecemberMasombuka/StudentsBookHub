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
  static async getBookById(dbPoolBooks,bookId){
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
  static async getAvailableCategories(dbPoolBooks){
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
  static async addNewBook(dbPoolBooks,sellerId,title,author,isbn,edition,condition_enum,price,description,category_id){
    try {
        //validate db Pool 
        validatedbPool(dbPoolBooks);

         const [result] = await dbPoolBooks.query('CALL insert_textbook(?,?,?,?,?,?,?,?,?)',[sellerId,title,author,isbn,edition,condition_enum,price,description,category_id]);
      
        return result.affectedRows > 0
    } catch (error) {
         console.error("Error Fetching available categories ", error);
         throw error;
    }
  }
}