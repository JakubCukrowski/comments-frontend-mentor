import {loggedUser} from "../db/db"
import { createReplyToReply } from "../functions/CreateReplyToReply"
import { Replies } from "./Types"
import { editReply } from "../functions/EditReply"

export const renderReply = (reply: Replies) => {

    //li element dynamically create
    const newReplyLi: HTMLLIElement = document.createElement("li")
    newReplyLi.addEventListener("click", createReplyToReply)
    
    newReplyLi.innerHTML = `
        <div class="reply">
            <div class="buttons-container">
                <div class="votes-container">
                    <button class="upvotes">+</button>
                    <span>${reply.score}</span>
                    <button class="downvote">-</button>
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
            <div class="reply-wrapper">
                <div class="userinfo longer">
                    <img src="${reply.user.image.png}" alt="avatar"></img>
                        <span class="username">${reply.user.username}</span>
                        ${reply.user.username === loggedUser.username ? 
                        `<span class="comment-author-flag">you</span>` : ""}
                        <span class="date">${reply.createdAt}</span>
                </div>
                <p class="content"><span class="replying-to">@${reply.replyingTo}</span> ${reply.content}</p>
            </div>
        </div>
    `

    newReplyLi.id = `reply-${reply.id}`
    newReplyLi.addEventListener("click", editReply)

    return newReplyLi
}