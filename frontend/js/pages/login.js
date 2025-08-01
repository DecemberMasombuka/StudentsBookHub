import { loginUser } from "../api.js";
import { saveToken} from "../auth.js";
import { displayMessage } from "../utils.js";

document.getElementById('js-login-form').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const username = document.getElementById('js-username-input').value;
    const password = document.getElementById('js-password-input').value;

    const messageBoxElement = document.getElementById('js-message-box');

    displayMessage(messageBoxElement,'');


    try {

        const token = await loginUser({username,password});
        displayMessage(messageBoxElement,token.message);
        saveToken(token);
        //window.location.href = '/textbooks.js';
      

    } catch (error) {
   //console.error(`Registration failed:` ,error.message);
   displayMessage(messageBoxElement,error.message,true);   
    }
})