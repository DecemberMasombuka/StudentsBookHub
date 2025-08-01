const API_URL= {
    registration :'http://localhost:5000/api/v1/auth/register',
    login : 'http://localhost:5000/api/v1/auth/login'
};

export  const registerUser = async (userData) =>{
   const response = await fetch(`${API_URL.registration}`,{
    method:"POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(userData)
   });

   const data = await response.json();
   if(!response.ok){
     throw new Error(data.Error || 'Registration Failed');
   }

   return data;

};

export const loginUser = async (userData) =>{
    const response = await fetch(`${API_URL.login}`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.Error || 'Login Failed');
    };

    return data;
}
