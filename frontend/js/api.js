const API_Endpoints= {
    registration :'http://localhost:5000/api/v1/auth/register',
    login : 'http://localhost:5000/api/v1/auth/login',
    getAllBooks : 'http://localhost:3000/api/v1/bookshub/textbooks',
    getCategories: 'http://localhost:3000/api/v1/bookshub/categories',
    getUserListings: (userId) => `http://localhost:3000/api/v1/bookshub/users/${userId}/textbooks`,
    deleteTextBook: (bookId) => `http://localhost:3000/api/v1/bookshub/textbooks/${bookId}`
};
                                    
export  const registerUser = async (userData) =>{
   

    const response = await fetch(`${API_Endpoints.registration}`,{
    method:"POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(userData)
   });

   const data = await response.json();
   if(!response.ok){
     throw new Error(data.error ||'Registration Failed');
   }

   return data;

};

export const loginUser = async (userData) =>{

    const response = await fetch(`${API_Endpoints.login}`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error || 'Login Failed');
    };

    return data;
}

export const getAllTextBooks = async (filters = {})=>{
    try {
        const params = new URLSearchParams(); //Creates a new URLSearchParams object

        if(filters.title){params.append('title',filters.title)};
        if(filters.category){params.append('category',filters.category)};

        const queryString = params.toString() //serializes parameters back to string(title=''&category='')
        const url = queryString ? `${API_Endpoints.getAllBooks}?${queryString}` : API_Endpoints.getAllBooks;
         

        const response = await fetch(url,{
            method:'GET',
            headers:{'Content-Type' : 'Application/json'}
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error || 'Get All Textbooks Failed')
        }
        return data;


    } catch (err) {
        throw new Error(err.message || 'Unexpected error in fetching textbooks');
    }
}

export const getCategories = async () =>{

    
    try {
        const response = await fetch(API_Endpoints.getCategories,{
            method: 'GET',
            headers:{'Content-Type' : 'Application/json'}
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.error || 'Get Categories Failed');
        }

        return data;
    } catch (err) {
        throw new Error(err.message || 'Unexpected error in fetching categories'); 
    }
}

export const getAllUserListings =  async (userId,token) =>{
          try {

            const response = await fetch(`${API_Endpoints.getUserListings(userId)}`,{
                method: 'GET',
                headers: {'Content-Type' : 'Application/json',
                           'Authorization' : `Bearer ${token}` 
                         }
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || 'Get Book Listings Failed');
            } 

            return data
            
          } catch (err) {
            throw new Error(err.message || 'Unexpected error in fetching textbooks')
          }
}

export const deleteBookListing = async (bookId,token) =>{
    try {
        const response = await fetch(API_Endpoints.deleteTextBook(bookId),{
            method : 'DELETE',
            headers : {'Content-Type' : 'Application/json',
                       'Authorization' : `Bearer ${token}`
            },
        })

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.error || 'Delete Book Listings Failed');
        } 

        return data
        
    } catch (err) {
        throw new Error(err.message || 'Unexpected error in deleting textbook listing')
    }
}