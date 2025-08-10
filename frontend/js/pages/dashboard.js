import {getToken } from "../auth.js";
import {displayMessage,decodeToken} from "../utils.js";
import { getAllUserListings,deleteBookListing } from "../api.js";

const main = document.getElementById('main');

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
            deleteButton.textContent = `🗑️`;
            
            
            divButton.append(editButton,deleteButton);
            divCard.append(thumb, title, author, price, condition,divButton);
            main.appendChild(divCard);
        });

    } catch (error) {
        console.error("Error fetching/displaying listings:", error.message);
        const messageBoxElement = document.getElementById('js-message-box');
        displayMessage(messageBoxElement, error.message, true);
    }
}

displayUserListings(main);

main.addEventListener('click', (event) =>{
    const target = event.target;
    console.log(target.classList);
    if(target.classList.contains('editButton')){
        
    }
})






