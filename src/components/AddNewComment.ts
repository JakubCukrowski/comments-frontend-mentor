import { commentsToObject } from "../index"
import {loggedUser} from "../db/db"
import {renderComment} from "./RenderComment"
import { Comments } from "./Types"

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
    const submitBtn: HTMLButtonElement = newDivElement.querySelector(".submit-reply-btn")
    const textarea: HTMLTextAreaElement = newDivElement.querySelector(".textarea") as HTMLTextAreaElement
    submitBtn.addEventListener("click", () => {
        
        const newComment: Comments = {
            id: commentsToObject.length + 1,
            content: textarea.value,
            createdAt: "2 minutes ago",
            score: 0,
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
        
        const convertCommentsToJSON: string = JSON.stringify(commentsToObject)
        localStorage.setItem('comments', convertCommentsToJSON)
        renderComment(newComment)
        textarea.value = ""

    })
    containerElement.append(newDivElement)
}