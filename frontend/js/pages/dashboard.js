import {getToken } from "../auth.js";
import {displayMessage,decodeToken} from "../utils.js";
import { getAllUserListings } from "../api.js";

const main = document.getElementById('main');


async function displayUserListings(main){

    try {
        
        main.innerHTML = '';
        const books = await getAllUserListings(decodeToken().userId,getToken());
        

        books.forEach(book => {
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');

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

            const category = document.createElement('h4');
            category.setAttribute('class', 'category');
            category.innerHTML = `Category: ${book.category_name}`;

            divCard.append(thumb, title, author, price, condition, category);
            main.appendChild(divCard);
        });

    } catch (error) {
        console.error("Error fetching/displaying listings:", error.message);
        const messageBoxElement = document.getElementById('js-message-box');
        displayMessage(messageBoxElement, error.message, true);
    }
}


displayUserListings(main);
