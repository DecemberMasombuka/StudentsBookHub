import { getAllTextBooks } from "../api.js";
import { getCategories } from "../api.js";
import { displayMessage } from "../utils.js";

const main = document.getElementById('main');
const categoryFilter = document.getElementById('js-category-input');
const searchFilter =document.getElementById('js-query-input');

const filters= {title:'',category:''};

categoriesData();
displayTextbooks(filters);

/**
 * fetches all textbooks from the server and displays them
 * called when page loads or when a user apply filters
 * @param {object} filters || null
 * 
 */
async function displayTextbooks(filters) {
    
    try {
        
        main.innerHTML = '';
        const books = await getAllTextBooks();

        //filter books array to only include books which matches the filters applied
        const filteredBooks = books.filter(book =>{
            //conditions to be checked for every item in books
            const matchesTitle = !filters.title || book.title.toLowerCase().includes(filters.title.toLowerCase());
            const matchesCategory = !filters.category || book.category_name.toLowerCase().includes(filters.category.toLowerCase());

            return matchesCategory && matchesTitle; //save items that passes both condition checks.
        })

        if (filteredBooks.length === 0) {

            main.innerHTML = '<p>No books found matching your filters.</p>';
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
            main.appendChild(divCard);
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
async function categoriesData(){
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

/**
 * Event listeners for any change in the dropdown or change in the search input
 * called when user interacts with either the drop down or text input elements
 */
categoryFilter.addEventListener('change', ()=>{
    const categoryInput = categoryFilter.value;
    if (categoryInput) filters.category = categoryInput;
    displayTextbooks(filters);
})


searchFilter.addEventListener('input',() =>{
    const searchQuery = searchFilter.value.trim();
    // Reset filters before applying
    filters.title = '';
    if (searchQuery) filters.title = searchQuery;
    displayTextbooks(filters);
})



//Reset filters button
document.getElementById('js-reset-filters').addEventListener('click', () => {
    //reset the elements and filters values 
    document.getElementById('js-query-input').value = '';
    document.getElementById('js-category-input').value = '';

    filters.title = '';
    filters.category = '';
    displayTextbooks(filters);
});

