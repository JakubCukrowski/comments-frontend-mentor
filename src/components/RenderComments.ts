import { Comments } from "./Types"
import {renderReplies} from "./RenderReplies"
import {createReplyToComment} from "./CreateReplyToComment"

export const renderComments = (object: Array<Comments>) => {
    object.forEach(comment => {
        //ul of class comments created in HTML
        const commentsUl:HTMLUListElement = document.querySelector(".comments")

        //li element dynamically create
        const newCommentLi: HTMLLIElement = document.createElement("li")
        newCommentLi.addEventListener("click", createReplyToComment)

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