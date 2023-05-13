import {loggedUser} from "../db/db"
import { createReplyToReply } from "../functions/CreateReplyToReply"
import { Replies } from "./Types"
import { editReply } from "../functions/EditReply"
import { deletePost } from "../functions/DeletePost"
import { upvote } from "../functions/upvote"
import { downvote } from "../functions/downvote"

export const renderReply = (reply: Replies) => {

    //li element dynamically create
    const newReplyLi: HTMLLIElement = document.createElement("li")
    newReplyLi.addEventListener("click", createReplyToReply)
    
    newReplyLi.innerHTML = `
        <div class="comment">
            <div class="comment-wrapper">
                <div class="votes-container votes-container-desktop">
                    <button class="upvotes">+</button>
                    <span class="score-desktop">${reply.score}</span>
                    <button class="downvotes">-</button>
                </div>
                <div class="comment-info">
                    <div class="comment-data">
                        <div class="comment-wrapper-desktop">
                            <div class="user-data">
                                <img class="avatar" src="${reply.user.image.png}" alt="avatar"></img>
                                <span class="username">${reply.user.username}</span>
                                ${reply.user.username === loggedUser.username 
                                    ? `<span class="comment-author-flag">you</span>` : ""}
                                <span class="date">${reply.createdAt}</span>
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
                    <button class="upvotes">+</button>
                    <span class="score">${reply.score}</span>
                    <button class="downvotes">-</button>
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

    newReplyLi.id = `reply-${reply.id}`
    newReplyLi.addEventListener("click", editReply)

    const deleteBtns: NodeListOf<HTMLButtonElement> = newReplyLi.querySelectorAll(".delete-btn")
    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener("click", deletePost))    

    const upvoteBtns: NodeListOf<HTMLButtonElement> = newReplyLi.querySelectorAll(".upvotes")
    upvoteBtns.forEach(upvoteBtn => upvoteBtn.addEventListener("click", upvote))

    const downvoteBtns: NodeListOf<HTMLButtonElement> = newReplyLi.querySelectorAll(".downvotes")
    downvoteBtns.forEach(downvoteBtn => downvoteBtn.addEventListener("click", downvote))
    

    return newReplyLi
}