import { loggedUser } from "./Comments"
import { commentsToObject } from "../index"

export const createReply = (event: Event) => {
    const replyButton = event.target as Element
    const commentLiElement = event.currentTarget as Element
    const lastChildOfLi = commentLiElement.lastChild as Element
    
    const filterComments = commentsToObject.filter(comment => commentLiElement.id === `comment-${comment.id}`)    
    
    if (replyButton.classList.contains("reply-button") || replyButton.classList.contains("reply-image")) {
        if (!replyButton.closest("ul").classList.contains("replies-container")) {
            const tempUl: HTMLUListElement = document.createElement("ul")
            tempUl.classList.add("temporary")
            const tempLi: HTMLLIElement = document.createElement("li")
            tempLi.classList.add("temp-li-element")

            const newReplyCreator: HTMLDivElement = document.createElement("div")
            
            newReplyCreator.classList.add("new-reply-window")
            newReplyCreator.innerHTML = `
                <div class="textarea" contenteditable>@${filterComments[0].user.username}</div>
                <div class ="bottom-reply-container">
                    <img src="${loggedUser.image.png}" alt="avatar"></img>
                    <button class="submit-reply-btn">REPLY</button>
                </div>
                `
            
            if (lastChildOfLi.classList === undefined) {
                tempLi.append(newReplyCreator)
                tempUl.append(tempLi)
                commentLiElement.append(tempUl)

            } else {
                tempLi.append(newReplyCreator)
                tempUl.append(tempLi)
                commentLiElement.insertBefore(tempUl, lastChildOfLi)
            }
            
        
        }
    }
}