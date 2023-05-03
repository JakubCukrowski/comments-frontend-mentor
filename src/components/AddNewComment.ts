import {loggedUser} from "./Comments"

export const addNewComment = () => {
    //catch container element
    const containerElement = document.querySelector(".container")

    //create div for new comment 
    const newDivElement: HTMLDivElement = document.createElement("div")
    newDivElement.classList.add("new-comment")

    newDivElement.innerHTML = `
        <textarea class="textarea" maxlength="120" placeholder="Add comment"></textarea>
        <div class ="bottom-reply-container">
            <img src="${loggedUser.image.png}" alt="avatar">
            <button class="submit-reply-btn">SEND</button>
        </div>
        `
    
    containerElement.append(newDivElement)
}