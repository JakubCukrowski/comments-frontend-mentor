import { Comments } from "./Types"
import {renderReply} from "./RenderReply"
import {createReplyToComment} from "../functions/CreateReplyToComment"
import { loggedUser } from "../db/db"
import { editComment } from "../functions/EditComment"
import { deletePost } from "../functions/DeletePost"

export const renderComment = (comment: Comments) => {
    //ul of class comments created in HTML
    const commentsUl: HTMLUListElement = document.querySelector(".comments")

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
                ${comment.user.username === loggedUser.username 
                ?
                `<div class="logged-user-buttons">
                    <button class="delete-btn">
                        <img src="./images/icon-delete.svg" att="bin">
                        Delete
                    </button>
                    <button class="edit-comment-btn">
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
            <div class="comment-wrapper">
                <div class="userinfo longer">
                    <img src="${comment.user.image.png}" alt="avatar"></img>
                    <span class="username">${comment.user.username}</span>
                    ${comment.user.username === loggedUser.username 
                        ? `<span class="comment-author-flag">you</span>` : ""}
                    <span class="date">${comment.createdAt}</span>
                </div>
                <p class="content">${comment.content}</p>
            </div>
        </div>
    `
    
    newCommentLi.id = `comment-${comment.id}`

    commentsUl.append(newCommentLi)

    if (comment.replies.length > 0) {
        const newRepliesUl: HTMLUListElement = document.createElement("ul")
        newRepliesUl.classList.add("replies-container")
        
        //append new ul to comment's li
        newCommentLi.append(newRepliesUl)

        comment.replies.forEach(reply => {
                                            
            const newReply: HTMLLIElement = renderReply(reply)

            newRepliesUl.append(newReply)
        })
    }  
    
    const editBtn: HTMLButtonElement = newCommentLi.querySelector(".edit-comment-btn")
    editBtn?.addEventListener("click", editComment)
    
    const deleteBtn: HTMLButtonElement = newCommentLi.querySelector(".delete-btn")
    deleteBtn?.addEventListener("click", deletePost)
    
}