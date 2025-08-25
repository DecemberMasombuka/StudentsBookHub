import { getToken } from "../auth.js";
import { categoriesData,isValidISBN,displayMessage} from "../utils.js";
import { addNewTextbook } from "../api.js";

const categoryFilter = document.getElementById('js-category-input');
const addnewForm = document.getElementById('js-add-book_form')
const messageBoxElement = document.getElementById('js-message-box');

categoriesData(categoryFilter);

addnewForm .addEventListener('submit', async (event) =>{
    event.preventDefault();
    
    const formData = new FormData(addnewForm );

    // Convert to plain object
const body = Object.fromEntries(formData.entries());



    if(!isValidISBN(formData.get('isbn'))){
        displayMessage(messageBoxElement,"Invalid ISBN", true);
        return;
    }

    try {
        const response = await addNewTextbook(getToken(),body);
        console.log(response);
        displayMessage(messageBoxElement,"Book added succesfully!✌️", false);
    } catch (error) {
        console.error("Error adding textbook", error.message);
        
        displayMessage(messageBoxElement, error.message, true);
    }
    



})
/* console.log(isValidISBN("0-306-40615-2"))

console.log(isValidISBN("978-3-16-148410-0"))
console.log(isValidISBN("123456789")) */