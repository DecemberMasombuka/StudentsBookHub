import booksDAO from "../dao/books.DAO.js";
import { getdbPool } from "../../helpers/dbpool.js";
import { authorizationCheck, validateData} from "../../helpers/input-auth.validation.js";

const dbPoolName = 'dbPoolBooks';
export default class BooksController{

    //get all books
    static async apiGetBooks(req,res,next){
       
        try {

            const{title,category} = req.query;
            //getdbpool
            const dbPoolBooks  = getdbPool(req,dbPoolName);
            const allBooks = await booksDAO.getAllBooksDAO(dbPoolBooks,{title,category});


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
        try {
            //getdbpool
            const dbPoolBooks  = getdbPool(req,dbPoolName);
            const bookId = req.params.id;

            const textBook = await booksDAO.getBookById(dbPoolBooks,bookId);
            if(!textBook){
                res.status(404).json({error:"Book not found!"});
                return
            }

            res.json(textBook);
            
        } catch (error) {
            console.error(`Error fetching a book:  ${error}`);
            res.status(500).json({error : error.message || "Server error during fetching a book"})
        }
    }


    //Get available categories
    static async apigetCatergories(req,res){
        try {
              //get dbpool from the app instance
              const dbPoolBooks  = getdbPool(req,dbPoolName);

              const availableCategories = await booksDAO.getAvailableCategories(dbPoolBooks);

            if(!availableCategories){
                res.status(404).json({error:"Categories not found!"});
                return
            }

            console.log(availableCategories);

            res.json(availableCategories);
              
             
            
        } catch (error) {
            console.error(`Error fetching available categories:  ${error}`);
            res.status(500).json({error : error.message || "Server error during fetching available categories"})
        }
    }



    //Add a new textbook listing
    static async apiAddBook(req,res,next){
           try {
                //Authorization check
                authorizationCheck(req,res);

                //get dbpool from the app instance
                const dbPoolBooks  = getdbPool(req,dbPoolName);

                //Validate nd Extract Data
                validateData(res,undefined,req.user.userId,req.body.title,req.body.author,req.body.isbn,req.body.edition,req.body.condition_enum,req.body.price,req.body.description,req.body.category_id);

                let sellerId = parseInt(req.user.userId);

                let {title,author,isbn,edition,condition_enum,price,description,category_id} = req.body;
                
                //call DAO to add task
                const newBook = await booksDAO.addNewBook(dbPoolBooks,sellerId,title,author,isbn,edition,condition_enum,parseFloat(price),description,parseInt(category_id));
                
                 if(newBook){
                    return res.status(201).json({ 
                        status: "Success",
                        message: "Textbook listing was successful",
                        //insertedId: newBook.insertId
                    });
                } 
                else {
                    
                    return res.status(500).json({ error: "Textbook could not be added" });
                }

                
           } catch (error) {
            console.error(`Error adding textbook listing:  ${error}`);
            res.status(500).json({error : error.message || "Server error during adding textbook listing"})
           }
    }

}
