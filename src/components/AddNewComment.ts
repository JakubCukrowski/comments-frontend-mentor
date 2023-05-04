import { commentsToObject } from "../index"
import {loggedUser} from "./Comments"
import {renderSingleComment} from "./RenderSingleComment"

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
        submitBtn.addEventListener("click", () => {
            commentsToObject.push({
                id: commentsToObject.length + 1,
                content: (newDivElement.querySelector(".textarea") as HTMLTextAreaElement).value,
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
            })
            
            const convertCommentsToJSON: string = JSON.stringify(commentsToObject)
            localStorage.setItem('comments', convertCommentsToJSON)
            renderSingleComment(newDivElement, (newDivElement.querySelector(".textarea") as HTMLTextAreaElement))

        })
    
    containerElement.append(newDivElement)
}