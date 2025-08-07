import { removeToken} from "../auth.js";



document.getElementById('js-logout-button').addEventListener('click',() =>{
    const confirmLogout = confirm('Are you sure you want to log out?');

    if(confirmLogout){
        removeToken();
        location.reload();
    }
    
})