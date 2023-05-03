import { loggedUser } from "./Comments"

export const createReplyToReply = (e: Event) => {
    const replyLi = e.currentTarget as Element

    //catch replies container, parent element of event target to append the reply window to it
    const repliesContainer = replyLi.parentElement as HTMLUListElement
    

    const newReplyLi = document.createElement("li")
    newReplyLi.id = "reply-new"
    
    const username = replyLi.querySelector(".username") as HTMLSpanElement
    
    const newReplyCreator: HTMLDivElement = document.createElement("div")
            
    newReplyCreator.classList.add("new-reply-window")
    newReplyCreator.innerHTML = `
        <textarea class="textarea" maxlength="120">@${username.innerText}</textarea>
        <div class ="bottom-reply-container">
            <img src="${loggedUser.image.png}" alt="avatar"></img>
            <button class="submit-reply-btn">REPLY</button>
        </div>
        `
    newReplyLi.append(newReplyCreator)
    repliesContainer.insertBefore(newReplyLi, replyLi.nextElementSibling)
    
    
    
}