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
        <textarea class="textarea" maxlength="120" placeholder="Add comment"></textarea>
        <div class ="user-data comment-data">
            <img class="avatar" src="${loggedUser.image.png}" alt="avatar">
            <button class="submit-reply-btn">SEND</button>
        </div>
        `
    const submitBtn: HTMLButtonElement = newDivElement.querySelector(".submit-reply-btn")
    const textarea: HTMLTextAreaElement = newDivElement.querySelector(".textarea") as HTMLTextAreaElement
    submitBtn.addEventListener("click", () => {
        
        const newComment: Comments = {
            id: commentsToObject.length + commentsToObject.map(comment => comment.replies).flat().length + 1,
            content: textarea.value,
            createdAt: "2 minutes ago",
            score: 0,
            voted: false,
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

    })
    containerElement.append(newDivElement)
}