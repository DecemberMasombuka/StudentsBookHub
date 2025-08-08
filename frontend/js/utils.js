import { getToken } from "./auth.js";
import { getAllTextBooks,getCategories } from "./api.js";

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


/**
 * fetches all textbooks from the server and displays them
 * called when page loads or when a user apply filters
 * @param {object} filters || null
 * 
 */
export const displayTextbooks = async (filters,mainElement) => {
    
    try {
        
        mainElement.innerHTML = '';
        const books = await getAllTextBooks();

        //filter books array to only include books which matches the filters applied
        const filteredBooks = books.filter(book =>{
            //conditions to be checked for every item in books
            const matchesTitle = !filters.title || book.title.toLowerCase().includes(filters.title.toLowerCase());
            const matchesCategory = !filters.category || book.category_name.toLowerCase().includes(filters.category.toLowerCase());

            return matchesCategory && matchesTitle; //save items that passes both condition checks.
        })

        if (filteredBooks.length === 0) {

            mainElement.innerHTML = '<p>No books found matching your filters.</p>';
            return;
        }

        filteredBooks.forEach(book => {
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
            mainElement.appendChild(divCard);
        });

    } catch (error) {
        console.error("Error fetching/displaying books:", error.message);
        const messageBoxElement = document.getElementById('js-message-box');
        displayMessage(messageBoxElement, error.message, true);
    }
}


/**
 * Retrieves all books categories from the server and loads them to dropdown
 * called when the page is loaded
 */
export const categoriesData = async(categoryFilter) =>{
    try {
        const categories  = await getCategories();
        categories.forEach(item =>{
          const option = document.createElement('option');
          option.value = item.category_name;
          option.textContent = item.category_name;
          categoryFilter.appendChild(option);
        })
        ;

    } catch (error) {
        console.error("Error fetching/displaying categories:", error.message);
        const messageBoxElement = document.getElementById('js-message-box');
        displayMessage(messageBoxElement, error.message, true); 
    }
}