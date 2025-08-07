import { registerUser } from "../api.js";
import { saveToken } from "../auth.js";
import { displayMessage } from "../utils.js";

/**
 * gets an element by id and listens to any action
 * called when the user clicks submit button.
 * @param {string} elementId
 */
document.getElementById('js-registration-form').addEventListener('submit',async(event)=>{
  event.preventDefault();

  const username = document.getElementById('js-username-input').value;
  const email = document.getElementById('js-email-input').value;
  const password = document.getElementById('js-password-input').value;
  const confirmPassword = document.getElementById('js-confirmPassword-input').value;
  const phoneNumber = document.getElementById('js-phoneNumber-input').value;
  const campusLocation = document.getElementById('js-campusLocation-input').value;

  const messageBoxElement =document.getElementById('js-message-box');

  //clear previous message
  displayMessage(messageBoxElement,'');


  try {
                const data = await registerUser({username,email,password,confirmPassword,phoneNumber,campusLocation});
                displayMessage(messageBoxElement,data.token.message);
                saveToken(data.token);

                
                location.replace('../pages/textbooks.html'); 
               
  } catch (error) {
    console.error(`Registration failed:` ,error.message);
   displayMessage(messageBoxElement,error.message,true);
  }
})