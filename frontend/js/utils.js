import { getToken } from "./auth.js";

export function displayMessage(messageBoxElement,message,isError = false){
    if(messageBoxElement){
        messageBoxElement.textContent = message;
        messageBoxElement.style.color = isError ? 'red' : 'green';
    }
}


export function decodeToken(){
 console.log('Running')
 if(getToken()) {

    return jwt_decode(getToken())
    
 }
  
}