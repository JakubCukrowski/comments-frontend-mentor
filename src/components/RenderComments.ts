import { Comments } from "./Types"
import {renderReplies} from "./RenderReply"
import {createReplyToComment} from "./CreateReplyToComment"
import { loggedUser } from "./Comments"

export const renderComments = (object: Array<Comments>) => {
    object.forEach(comment => {
        //ul of class comments created in HTML
        const commentsUl:HTMLUListElement = document.querySelector(".comments")

        //li element dynamically create
        const newCommentLi: HTMLLIElement = document.createElement("li")
        newCommentLi.addEventListener("click", createReplyToComment)

        if (comment.user.username === loggedUser.username) {
            newCommentLi.innerHTML = `
                <div class="comment">
                    <div class="buttons-container">
                        <div class="votes-container">
                            <button class="upvotes">+</button>
                            <span>${comment.score}</span>
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
                    <div class="comment-wrapper">
                        <div class="userinfo longer">
                            <img src="${comment.user.image.png}" alt="avatar"></img>
                            <span class="username">${comment.user.username}</span>
                            <span class="comment-author-flag">you</span>
                            <span class="date">${comment.createdAt}</span>
                        </div>
                        <p>${comment.content}</p>
                    </div>
                </div>
            `
        } else {
            newCommentLi.innerHTML = `
                <div class="comment">
                    <div class="buttons-container">
                        <div class="votes-container">
                            <button class="upvotes">+</button>
                            <span>${comment.score}</span>
                            <button class="downvote">-</button>
                        </div>
                        <button class="reply-button">
                            <img class="reply-image" src="./images/icon-reply.svg"></img>
                            Reply
                        </button>
                    </div>
                    <div class="comment-wrapper">
                        <div class="userinfo">
                            <img src="${comment.user.image.png}" alt="avatar"></img>
                            <span class="username">${comment.user.username}</span>
                            <span class="date">${comment.createdAt}</span>
                        </div>
                        <p>${comment.content}</p>
                    </div>
                </div>
            `
        }
        
        newCommentLi.id = `comment-${comment.id}`

        commentsUl.append(newCommentLi)

        if (comment.replies.length > 0) {
            const newRepliesUl: HTMLUListElement = document.createElement("ul")
           
            //append new ul to comment's li
            newCommentLi.append(newRepliesUl)

            comment.replies.forEach(reply => {
                               
                                
                const newReply: HTMLLIElement = renderReplies(
                    reply.score,
                    reply.user.image.png,
                    reply.user.username,
                    reply.createdAt,
                    reply.content,
                    reply.replyingTo,
                    reply.id,
                )

                newRepliesUl.append(newReply)
                newRepliesUl.classList.add("replies-container")
            })
            
        }
                                                                
    })   
}