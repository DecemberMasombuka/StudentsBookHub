const TOKEN_KEY = 'authoken';
/**
 * Saves the JWT to local Storage
 * called after a successful login/registration
 * @param {string} token 
 */
export function saveToken(token){
    if(token){

        localStorage.setItem(TOKEN_KEY,token);
    }
};

/**
 * Retrives JWT from local storage
 * used to add token to the API request headers
 * @returns {string|null} stored JWT or null if non found
 */

export function getToken(){
    return localStorage.getItem(TOKEN_KEY);
};




//deletes JWT from local storage when a user logs out
export function removeToken(){
    localStorage.removeItem(TOKEN_KEY);
};

//checks if the user is already authenticated
export function isAuthenticated(){
    const token = getToken();

    return !!token //returns true if token is not null/undefined/empty string
}
