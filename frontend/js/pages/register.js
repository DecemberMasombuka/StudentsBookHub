import { registerUser } from "../api.js";
import { saveToken } from "../auth.js";

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


  try {
                const token = await registerUser({username,email,password,confirmPassword,phoneNumber,campusLocation});

                saveToken(token);

                console.log(`Registration successful!`);
                //window.location.href = '/textbooks.js'
  } catch (error) {
    console.error(`Registration failed:` ,error.message);
    const errorMessageDiv = document.getElementById('js-message-box');
    if(errorMessageDiv){
        errorMessageDiv.textContent = error.message;
    }
  }
})