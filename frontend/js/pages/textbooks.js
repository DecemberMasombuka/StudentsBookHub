
import { isAuthenticated ,getToken } from "../auth.js";
import {displayTextbooks,categoriesData,decodeToken} from "../utils.js";

const main = document.getElementById('main');
const categoryFilter = document.getElementById('js-category-input');
const searchFilter =document.getElementById('js-query-input');

const loginOrMylisting = document.getElementById('js-login-mylisting-nav');
const registerNav = document.getElementById('js-register-nav');
const logoutButton = document.getElementById('js-logout-button');


const welcomeMessage = document.getElementById('js-header_h2');


const filters= {title:'',category:''};


/**
 * Event listeners for any change in the dropdown or change in the search input
 * called when user interacts with either the drop down or text input elements
 */
categoryFilter.addEventListener('change', ()=>{
    const categoryInput = categoryFilter.value;
    if (categoryInput) filters.category = categoryInput;
    displayTextbooks(filters,main);
})


searchFilter.addEventListener('input',() =>{
    const searchQuery = searchFilter.value.trim();
    // Reset filters before applying
    filters.title = '';
    if (searchQuery) filters.title = searchQuery;
    displayTextbooks(filters,main);
})



//Reset filters button
document.getElementById('js-reset-filters').addEventListener('click', () => {
    //reset the elements and filters values 
    document.getElementById('js-query-input').value = '';
    document.getElementById('js-category-input').value = '';

    filters.title = '';
    filters.category = '';
    displayTextbooks(filters,main);
});


document.addEventListener("DOMContentLoaded", function() {

  //if user is authenticated, then hide/show certain nav bar elements(login,register,logout);
    if(isAuthenticated()){

        loginOrMylisting.textContent= "My Listings";
        loginOrMylisting.href = "./dashboard.html"

        registerNav.style.display = "none";

        welcomeMessage.textContent = `Hi ${decodeToken().username},  Welcome to Student Books Hub!`
    }else{

        loginOrMylisting.textContent= "Login";
        loginOrMylisting.href = "./login.html";

        logoutButton.style.display = "none";

        registerNav.style.display = "js-register-nav";  
    }
});

categoriesData(categoryFilter);
displayTextbooks(filters,main);