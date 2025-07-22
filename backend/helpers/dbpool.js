
//getdbpool from the app instance
export function getdbPool(req,dbPoolName){
    const dbPool = req.app.get(dbPoolName);
    return dbPool;
};

//Validate dbpool
export function validatedbPool(dbPool){
     if (!dbPool || typeof dbPool.query !== 'function') {
            throw new Error("Database pool not available in BooksDAO.getAllBooksDAO");
        }   
}