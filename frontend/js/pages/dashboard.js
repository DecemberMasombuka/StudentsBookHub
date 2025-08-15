import {getToken } from "../auth.js";
import {displayMessage,decodeToken} from "../utils.js";
import { getAllUserListings,deleteBookListing } from "../api.js";

const main = document.getElementById('main');
const messageBoxElement = document.getElementById('js-message-box');
const home = document.getElementById('js-home-nav');
const addNewButton = document.getElementById('js-addnew-button');
/**
 * fetches all user/seller textbooks from the server and displays them
 * called when  dashboard page loads.
 * @param {int} userId || null
 * 
 */
async function displayUserListings(main){

    try {
        
        main.innerHTML = '';
        const books = await getAllUserListings(decodeToken().userId,getToken());

       if(books.length === 0){
        displayMessage(messageBoxElement,"No listings found",true);
       }
        books.forEach(book => {
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            divCard.style.border = '2px solid red';
            const thumb = document.createElement('img');
            thumb.setAttribute('class', 'img');
            thumb.setAttribute('width', '150px');
            thumb.setAttribute('height', '150px');

            const title = document.createElement('h4');
            title.setAttribute('class', 'title');
            title.innerHTML = "Title: " + book.title;

            const author = document.createElement('h4');
            author.setAttribute('class', 'author');
            author.innerHTML = "Author: " + book.author;

            const price = document.createElement('h4');
            price.setAttribute('class', 'price');
            price.innerHTML = `Price: R ${book.price}`;

            const condition = document.createElement('h4');
            condition.setAttribute('class', 'condition');
            condition.innerHTML = `Condition: ${book.condition_enum}`;

            const divButton = document.createElement('div');
            divButton.setAttribute('class','divButton');
            divButton.style.border = '2px solid blue';

            const editButton = document.createElement('button');
            editButton.setAttribute('class','editButton');
            
            editButton.textContent = `🖋️`;

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'deleteButton');
            deleteButton.dataset.textbookId = book.textbook_id;
        
            deleteButton.textContent = `🗑️`;
            
            
            divButton.append(editButton,deleteButton);
            divCard.append(thumb, title, author, price, condition,divButton);
            main.appendChild(divCard);
        });

    } catch (error) {
        console.error("Error fetching/displaying listings:", error.message);
        
        displayMessage(messageBoxElement, error.message, true);
    }
}

displayUserListings(main);

home.addEventListener('click', ()=>{
    location.replace('../pages/textbooks.html');
});
addNewButton.addEventListener('click', ()=>{
    location.replace('../pages/add-book.html');
});




//Event delegation for Edit and Delete buttons on the main element
main.addEventListener('click', async (event) =>{
    const target = event.target;
    
    if(target.classList.contains('deleteButton')){
        const bookId = target.dataset.textbookId;
        try {
            const confirmDelete = confirm('Are you sure you want to delete this textbook?');
            if(confirmDelete){
                const response = await deleteBookListing(bookId,getToken());
                if(response){
                    displayUserListings(main);
                    displayMessage(messageBoxElement,response.message);
                    
                }

            }
        } catch (error) {
            console.error("Error deleting textbook", error.message);
        
            displayMessage(messageBoxElement, error.message, true);  
        }
    }
})






