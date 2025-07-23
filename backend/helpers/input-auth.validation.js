
export function authorizationCheck(req,res){
 
    if (!req.user.username) {
            return res.status(401).json({ error: "Unauthorized: User not logged in" });
        }

}

//function to valid user input
export function validateData(res,textbookId = 0,title,author,isbn,edition,condition,price,description,category_id){
      if(textbookId === null || !title || !author || !isbn || !edition || !condition || !price || !description || !category_id){
        return res.status(401).json({ error: "Invalid Input: User input is not valid/missing" });
      }
}
