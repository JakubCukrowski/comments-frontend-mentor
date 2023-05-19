import { loggedUser } from "../db/db"
import { commentsToObject } from "../index"
import {submitReply} from "./SubmitReply"

export const createReplyToComment = (event: Event) => {
    
    //target reply button on reply window
    const replyButton = event.target as Element

    //target li with event listener
    const commentLiElement = event.currentTarget as Element   

    //target last child of event, to determine where append the reply window
    const lastChildOfLi = commentLiElement.lastChild as Element
    
    //comment which we are reffering to
    const filterComments = commentsToObject.filter(comment => commentLiElement.id === `comment-${comment.id}`)
    
    //logic to render new reply window
    if (replyButton.classList.contains("reply-comment-button") || replyButton.classList.contains("reply-image")) {

        //delete other replies container
        const allReplies: NodeListOf<HTMLUListElement> = document.querySelectorAll(".temporary")
        allReplies.forEach(reply => reply.remove())

        const newRepliesContainerElement: HTMLLIElement = document.querySelector("#reply-new")
        if (newRepliesContainerElement) {
            newRepliesContainerElement.remove()
        }

        if (!replyButton.closest("ul").classList.contains("replies-container")) {
            const tempUl: HTMLUListElement = document.createElement("ul")
            tempUl.classList.add("temporary")
            const tempLi: HTMLLIElement = document.createElement("li")
            tempLi.classList.add("temp-li-element")
            tempLi.addEventListener("click", submitReply)

            const newReplyCreator: HTMLDivElement = document.createElement("div")
            
            newReplyCreator.classList.add("new-reply-window")
            newReplyCreator.innerHTML = `
                <img class="desktop-profile-img" src="${loggedUser.image.png}" alt="avatar"></img>
                <textarea class="textarea" maxlength="120">@${filterComments[0].user.username}, </textarea>
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