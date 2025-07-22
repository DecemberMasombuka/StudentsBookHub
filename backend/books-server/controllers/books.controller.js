import booksDAO from "../dao/books.DAO.js";


export default class BooksController{

    //get all books
    static async apiGetBooks(req,res,next){
        console.log('apigetbooks controller');
        try {

            const{title,category} = req.query;
            const dbPoolBooks = req.app.get('dbPoolBooks'); //get dbpool from the app instance
            const allBooks = await booksDAO.getAllBooksDAO(dbPoolBooks,{title,category});
            //console.log(allBooks);

            if(!allBooks || allBooks.length === 0){
                res.status(404).json({error:"Books not found!"});
                 return
            }
            //respond to client request
            res.json(allBooks);
        } catch (error) {
            console.error(`Error fetching books:  ${error}`);
            res.status(500).json({error : error.message || "Server error during fetching books"})
        }
    }


    //Get book by Id
    static async apiGetBook(req,res,next){
        console.log('apigetbook controller');
        try {
            const dbPoolBooks = req.app.get('dbPoolBooks'); //get dbpool from the app instance
            const bookId = req.params.id;

            const textBook = await dbPoolBooks.booksDAO.getBookByID(dbPoolBooks,bookId);
            if(!textBook){
                res.status(404).json({error:"Book not found!"});
                return
            }

            console.log(textBook);

            res.json(textBook);
            
        } catch (error) {
            console.error(`Error fetching a book:  ${error}`);
            res.status(500).json({error : error.message || "Server error during fetching a book"})
        }
    }

}