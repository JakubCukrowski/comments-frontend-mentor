import { commentsToObject } from "../index"
import {loggedUser} from "../db/db"
import {renderComment} from "./RenderComment"
import { Comments } from "./Types"
import { updateLocalStorage } from "../functions/UpdateLocalStorage"

export const addNewComment = () => {
    //catch container element
    const containerElement = document.querySelector(".container")

    //create div for new comment 
    const newDivElement: HTMLDivElement = document.createElement("div")
    newDivElement.classList.add("new-comment")

    newDivElement.innerHTML = `
        <img class="avatar avatar-desktop" src="${loggedUser.image.png}" alt="avatar">
        <textarea class="textarea" maxlength="120" placeholder="Add comment"></textarea>
        <button class="submit-reply-btn submit-reply-dekstop">SEND</button>
        <div class ="user-data comment-data-new">
            <img class="avatar" src="${loggedUser.image.png}" alt="avatar">
            <button class="submit-reply-btn">SEND</button>
        </div>
        `
    const submitBtns: NodeListOf<HTMLButtonElement> = newDivElement.querySelectorAll(".submit-reply-btn")
    const textarea: HTMLTextAreaElement = newDivElement.querySelector(".textarea") as HTMLTextAreaElement
    submitBtns.forEach(submitBtn => submitBtn.addEventListener("click", () => {
        
        const newComment: Comments = {
            id: commentsToObject.length + commentsToObject.map(comment => comment.replies).flat().length + 1,
            content: textarea.value,
            createdAt: "2 minutes ago",
            score: 0,
            upvoted: false,
            downvoted: false,
            user: {
                image: { 
                png: loggedUser.image.png,
                webp: loggedUser.image.webp,
                },
                username: loggedUser.username
            },
            replies: []
        }            

        commentsToObject.push(newComment)
        
        updateLocalStorage("comments", commentsToObject)
        renderComment(newComment)
        textarea.value = ""

    }))
    containerElement.append(newDivElement)
}