import booksDAO from "../dao/books.DAO.js";
import { getdbPool } from "../../helpers/dbpool.js";
import { authorizationCheck} from "../../helpers/auth.validation.js";

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

            const textBook = await booksDAO.getBookByIdDAO(dbPoolBooks,bookId);
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

              const availableCategories = await booksDAO.getAvailableCategoriesDAO(dbPoolBooks);

            if(!availableCategories){
                res.status(404).json({error:"Categories not found!"});
                return
            }

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

                //Validate and Extract Data
                if( !req.body.title|| !req.body.author || !req.body.isbn || !req.body.edition || !req.body.condition || !req.body.price || !req.body.description || !req.body.category_id){
                    return res.status(401).json({ error: "Invalid Input: User input is not valid/missing" });
                  }
                
                //get userId from the middleware and parse it to INT
                let sellerId = parseInt(req.user.userId);

                let {title,author,isbn,edition,condition_enum,price,description,category_id} = req.body;
                
                //call DAO to add book
                const newBook = await booksDAO.addNewBookDAO(dbPoolBooks,sellerId,title,author,isbn,edition,condition_enum,parseFloat(price),description,parseInt(category_id));
                
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


    //Update textbook listing
    static async apiUpdateBook(req,res){
        try {
            

             //Authorization check
             authorizationCheck(req,res);

             //get dbpool from the app instance
             const dbPoolBooks  = getdbPool(req,dbPoolName);

             
            //Get textbook Id from the request
            const textbookId = parseInt(req.params.id);
            //get the logged in  userId/Seller Id from the middleware
            const sellerId = req.user.userId;
       
            const userData = req.body; 

            const allowedField = [
                "title",
                "author",
                "isbn",
                "edition",
                "condiition_enum",
                "price",
                "description",
                "category_id"
            ]

            const fieldsToUpdate = {}; //an object with only the fields that are actually provided in the request's body
            let hasValidField = false;

            
            allowedField.some(field =>{
                //check if atleast one field is provided(not null / undefined)
                if(userData[field] !== undefined && userData[field] !== null){
                  fieldsToUpdate[field] = userData[field]; //store the provided field
                  hasValidField = true;
                }
            });

            //if there's atleast one field which is not null
            if(!hasValidField){
                return res.status(400).json({ error: "At least one field must be provided for update." });
            }
            
            //valid price data type
            if(userData.price && typeof userData.price !== "number" || userData.category_id && typeof userData.category_id !== "number") {
                return res.status(400).json({ error: "Price /category must be a number." });
            }

            
            //call DAO to update textbook
            const success = await booksDAO.updateBookDAO(dbPoolBooks, sellerId, textbookId, fieldsToUpdate);
            
            if (!success || success.length === 0) {
                
                return res.status(404).json({ error: "Textbook not found or no permission to make an update or  no updates to make." });
              } else {
                return res.status(200).json({ message: "Textbook updated successfully." });
                
              }

            
        } catch (error) {
            console.error(`Error updating textbook listing:  ${error}`);
            res.status(500).json({error : error.message || "Server error during updating textbook listing"})
        }
    }

    //Delete textbook listing
    static async apiDeleteBook(req,res){
        try {
             //Authorization check
             authorizationCheck(req,res);

             //get dbpool from the app instance
             const dbPoolBooks  = getdbPool(req,dbPoolName);

             
            //Get textbook Id from the request
            const textbookId = parseInt(req.params.id);
            //get the logged in  userId/Seller Id from the middleware
            const sellerId = req.user.userId;

            const success = await booksDAO.deleteBookDAO(dbPoolBooks,sellerId,textbookId);

            if (!success || success.length === 0) {
                
                return res.status(404).json({ error: "Textbook not found or no permission to delete textbook listing" });
              } else {
                return res.status(200).json({ message: "Textbook deleted successfully."});
              }
            
        } catch (error) {
            console.error(`Error deleting textbook listing:  ${error}`);
            res.status(500).json({error : error.message || "Server error during deleting textbook listing"})
        }
    }

    //Get all  user Textbooks Listings
    static async apiGetAllBooks(req,res){
       
        try {
             //Authorization check
             authorizationCheck(req,res);
             //get dbpool from the app instance
             const dbPoolBooks  = getdbPool(req,dbPoolName);


            //get user ID from the request
            const userId = req.params.userId;  
            //get the logged in  userId/Seller Id from the middleware
            const sellerId = req.user.userId;

            //check if it's the owner that's viewing their listings
            if(parseInt(userId) !== parseInt(sellerId)){
                console.log(userId, sellerId);
                res.status(404).json({error:"User has no permision to view textbooks listings!"});
                return
            }
             
            
            const userTextBookListings = await booksDAO.getUserBooksDAO(dbPoolBooks,userId);

            if(!userTextBookListings){
                res.status(404).json({error:"Books not found for the user!"});
                 return
            }
            //respond to client request
            res.json(userTextBookListings);
            
        } catch (error) {
            console.error(`Error getting  user textbooks listings:  ${error}`);
            res.status(500).json({error : error.message || "Server error during getTing user textbooks listings"}) 
        }
    }

}
