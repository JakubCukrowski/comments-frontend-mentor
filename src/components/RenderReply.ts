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
        <div class="reply">
            <div class="reply-wrapper">
                <div class="userinfo">
                    <img src="${reply.user.image.png}" alt="avatar"></img>
                        <span class="username">${reply.user.username}</span>
                        ${reply.user.username === loggedUser.username ? 
                        `<span class="comment-author-flag">you</span>` : ""}
                        <span class="date">${reply.createdAt}</span>
                </div>
            </div>
            <p class="content"><span class="replying-to">@${reply.replyingTo}</span> ${reply.content}</p>
            <div class="buttons-container">
                <div class="votes-container">
                    <button class="upvotes">+</button>
                    <span class="score">${reply.score}</span>
                    <button class="downvotes">-</button>
                </div>
                ${reply.user.username === loggedUser.username ?
                `<div class="logged-user-buttons">
                    <button class="delete-btn">
                        <img class="delete-img" src="./images/icon-delete.svg" att="bin">
                        Delete
                    </button>
                        <button class="edit-btn">
                        <img class="edit-img" src="./images/icon-edit.svg" att="bin">
                    Edit
                    </button>
                </div>` :
                `<button class="reply-button">
                    <img class="reply-image" src="./images/icon-reply.svg"></img>
                    Reply
                </button>`}
            </div>
        </div>
    `

    newReplyLi.id = `reply-${reply.id}`
    newReplyLi.addEventListener("click", editReply)

    const deleteBtn: HTMLButtonElement = newReplyLi.querySelector(".delete-btn")
    deleteBtn?.addEventListener("click", deletePost)

    const upvoteBtn: HTMLButtonElement = newReplyLi.querySelector(".upvotes")
    upvoteBtn.addEventListener("click", upvote)

    const downvoteBtn: HTMLButtonElement = newReplyLi.querySelector(".downvotes")
    downvoteBtn.addEventListener("click", downvote)
    

    return newReplyLi
}