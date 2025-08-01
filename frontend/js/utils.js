
export function displayMessage(messageBoxElement,message,isError = false){
    if(messageBoxElement){
        messageBoxElement.textContent = message;
        messageBoxElement.style.color = isError ? 'red' : 'green';
    }
}
