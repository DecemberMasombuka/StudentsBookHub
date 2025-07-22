
export function authorizationCheck(req,res){
 
    if (!req.username) {
            return res.status(401).json({ error: "Unauthorized: User not logged in" });
        }

}

//function to valid user input
export function extractData(req,res,textbookId = null,sellerId,title,author,isbn,edition,condition,price,description,category_id){
    
}
