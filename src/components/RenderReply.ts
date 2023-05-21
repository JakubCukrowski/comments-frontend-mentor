import {loggedUser} from "../db/db"
import { createReplyToReply } from "../functions/CreateReplyToReply"
import { Replies } from "./Types"
import { editReply } from "../functions/EditReply"
import { elapsedTime } from "../functions/ElapsedTime"

export const renderReply = (reply: Replies) => {

    //li element dynamically create
    const newReplyLi: HTMLLIElement = document.createElement("li")
    newReplyLi.addEventListener("click", createReplyToReply)
    
    newReplyLi.innerHTML = `
        <div class="comment">
            <div class="comment-wrapper">
                <div class="votes-container votes-container-desktop">
                    <button class="upvotes-desktop ${reply.upvoted ? "upvoted" : ""}">+</button>
                    <span class="score-desktop ${reply.upvoted ? "upvoted" : ""} ${reply.downvoted ? "downvoted" : ""}">
                        ${reply.score}
                    </span>
                    <button class="downvotes-desktop ${reply.downvoted ? "downvoted" : ""}">-</button>
                </div>
                <div class="comment-info">
                    <div class="comment-data">
                        <div class="comment-wrapper-desktop">
                            <div class="user-data">
                                <img class="avatar" src="${reply.user.image.png}" alt="avatar"></img>
                                <span class="username">${reply.user.username}</span>
                                ${reply.user.username === loggedUser.username 
                                    ? `<span class="comment-author-flag">you</span>` : ""}
                                <span class="date">${elapsedTime(new Date(reply.createdAt))}</span>
                            </div>

                            <div class="desktop-buttons">
                                ${reply.user.username === loggedUser.username 
                                ?
                                `<div class="logged-user-buttons">
                                    <button class="delete-btn">
                                        <img src="./images/icon-delete.svg" att="bin">
                                        Delete
                                    </button>
                                    <button class="edit-btn">
                                        <img src="./images/icon-edit.svg" att="bin">
                                        Edit
                                    </button>
                                </div>` 
                                :
                                `<button class="reply-button">
                                    <img class="reply-image" src="./images/icon-reply.svg"></img>
                                    Reply
                                </button>`
                                }
                            </div>
                        </div>
                    
                        <p class="content"><span class="replying-to">@${reply.replyingTo}</span> ${reply.content}</p>

                    </div>    
                </div>
            </div>        
        
            <div class="buttons-container">
                <div class="votes-container">
                    <button class="upvotes ${reply.upvoted ? "upvoted" : ""}">+</button>
                    <span class="score ${reply.upvoted ? "upvoted" : ""} ${reply.downvoted ? "downvoted" : ""}">
                        ${reply.score}
                    </span>
                    <button class="downvotes ${reply.downvoted ? "downvoted" : ""}">-</button>
                </div>
                ${reply.user.username === loggedUser.username 
                ?
                `<div class="logged-user-buttons">
                    <button class="delete-btn">
                        <img src="./images/icon-delete.svg" att="bin">
                        Delete
                    </button>
                    <button class="edit-btn">
                        <img src="./images/icon-edit.svg" att="bin">
                        Edit
                    </button>
                </div>` 
                :
                `<button class="reply-button">
                    <img class="reply-image" src="./images/icon-reply.svg"></img>
                    Reply
                </button>`
                }
        </div>
    </div>        
    `

    const updateElapsedTime = () => {
        const dateElement: HTMLSpanElement = newReplyLi.querySelector(".date")
        if (dateElement) {
            const commentDate = new Date(reply.createdAt)
            dateElement.innerText = elapsedTime(commentDate)
        }
    }

    updateElapsedTime()
    
    setInterval(() => {
        updateElapsedTime()
    }, 60000)

    newReplyLi.id = `reply-${reply.id}`
    newReplyLi.addEventListener("click", editReply)

    return newReplyLi
}