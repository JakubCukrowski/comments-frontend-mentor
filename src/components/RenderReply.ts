import {loggedUser} from "./Comments"
import { createReplyToReply } from "../functions/CreateReplyToReply"
import { Replies } from "./Types"

export const renderReply = (reply: Replies) => {

    //li element dynamically create
    const newReplyLi: HTMLLIElement = document.createElement("li")
    newReplyLi.addEventListener("click", createReplyToReply)
    
    if (reply.user.username === loggedUser.username) {
        newReplyLi.innerHTML = `
            <div class="reply">
                <div class="buttons-container">
                    <div class="votes-container">
                        <button class="upvotes">+</button>
                        <span>${reply.score}</span>
                        <button class="downvote">-</button>
                    </div>
                    <div class="logged-user-buttons">
                        <button class="delete-btn">
                            <img src="./images/icon-delete.svg" att="bin">
                            Delete
                        </button>
                            <button class="edit-btn">
                            <img src="./images/icon-edit.svg" att="bin">
                        Edit
                        </button>
                    </div>
                </div>
                <div class="reply-wrapper">
                    <div class="userinfo longer">
                        <img src="${reply.user.image.png}" alt="avatar"></img>
                            <span class="username">${reply.user.username}</span>
                            <span class="comment-author-flag">you</span>
                            <span class="date">${reply.createdAt}</span>
                    </div>
                    <p><span class="replying-to">@${reply.replyingTo}</span> ${reply.content}</p>
                </div>
            </div>
        `
        
    } else {
        newReplyLi.innerHTML = `
            <div class="reply">
                <div class="buttons-container">
                    <div class="votes-container">
                        <button class="upvotes">+</button>
                        <span>${reply.score}</span>
                        <button class="downvote">-</button>
                    </div>
                    <button class="reply-button">
                        <img class="reply-image" src="./images/icon-reply.svg"></img>
                        Reply
                    </button>
                </div>
                <div class="reply-wrapper">
                    <div class="userinfo">
                        <img src="${reply.user.image.png}" alt="avatar"></img>
                        <span class="username">${reply.user.username}</span>
                        <span class="date">${reply.createdAt}</span>
                    </div>
                    <p><span class="replying-to">@${reply.replyingTo}</span> ${reply.content}</p>
                </div>
            </div>
        `
    }

    newReplyLi.id = `reply-${reply.id}`

    return newReplyLi
}