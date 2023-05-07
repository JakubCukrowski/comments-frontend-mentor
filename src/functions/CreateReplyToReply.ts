import { loggedUser } from "../components/Comments"
import { commentsToObject } from "../index"
import { submitReply } from "./SubmitReply"

export const createReplyToReply = (e: Event) => {
    const replyLi = e.currentTarget as Element
    const replyButton = e.target as Element    
  
    if (replyButton.classList.contains("reply-button") || replyButton.classList.contains("reply-image")) {
        //catch replies container, parent element of event target to append the reply window to it
        const repliesContainer = replyLi.parentElement as HTMLUListElement
        
        //li of a comment 
        const commentLi: HTMLLIElement = repliesContainer.closest("li")

        //filter all comments by id
        const commentToReply = commentsToObject.filter(comment => commentLi.id === `comment-${comment.id}`)
        
        const replyRef = commentToReply[0].replies.filter(reply => replyLi.id === `reply-${reply.id}`)       

        const newReplyLi = document.createElement("li")
        newReplyLi.id = "reply-new"
        newReplyLi.addEventListener("click", submitReply)
        
        const username = replyLi.querySelector(".username") as HTMLSpanElement
        
        const newReplyCreator: HTMLDivElement = document.createElement("div")
                
        newReplyCreator.classList.add("new-reply-window")
        newReplyCreator.innerHTML = `
            <textarea class="textarea" maxlength="120">@${replyRef[0].user.username}, </textarea>
            <div class ="bottom-reply-container">
                <img src="${loggedUser.image.png}" alt="avatar"></img>
                <button class="submit-reply-btn">REPLY</button>
            </div>
            `
        newReplyLi.append(newReplyCreator)
        repliesContainer.insertBefore(newReplyLi, replyLi.nextElementSibling)
        replyLi.removeEventListener("click", createReplyToReply)
    }
    
}