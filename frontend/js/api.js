const API_URL= {
    registration :'http://localhost:5000/api/v1/auth/register',
    login : 'http://localhost:5000/api/v1/auth/login',
    getAllBooks : 'http://localhost:3000/api/v1/bookshub/textbooks',
    //getAllBooksSearch : "http://localhost:3000/api/v1/bookshub/textbooks?title=Cal&category=Mathematics"
};
                                    
export  const registerUser = async (userData) =>{
   
    const response = await fetch(`${API_URL.registration}`,{
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

    console.log(userData);
    const response = await fetch(`${API_URL.login}`,{
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
        const url = queryString ? `${API_URL.getAllBooks}?${queryString}` : API_URL.getAllBooks;

        const response = await fetch(url,{
            method:'GET',
            headers:{'Content-Type' : 'Application/json'}
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error || 'Get All Textbooks Failed')
        }
        console.log(data);
        return data;


    } catch (err) {
        throw new Error(err.message || 'Unexpected error in fetching textbooks');
    }
}
