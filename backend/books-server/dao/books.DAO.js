

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
         if (!dbPoolBooks || typeof dbPoolBooks.query !== 'function') {
            throw new Error("Database pool not available in BooksDAO.getAllBooksDAO");
        }

        const [result] = await dbPoolBooks.query(query,params);
        const books = result;
        return books;
        

    } catch (error) {
        console.error("Error Fetching books: ", error);
            throw error;
    }
  }


  //get book by Id
  static async getBookByID(dbPoolBooks,bookId){
    try {

        //validate db Pool 
        if (!dbPoolBooks || typeof dbPoolBooks.query !== 'function') {
            throw new Error("Database pool not available in BooksDAO.getBookByIdDAO");
        }

        const [result] = await dbPoolBooks.query('SELECT * FROM campus_textbooks WHERE textbook_id = ?',[bookId])


        
    } catch (error) {
        console.error("Error Fetching a book: ", error);
        throw error;
    }
  }
}