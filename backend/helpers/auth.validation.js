
export function authorizationCheck(req,res){
 
    if (!req.user.username) {
            return res.status(401).json({ error: "Unauthorized: User not logged in" });
        }

}


