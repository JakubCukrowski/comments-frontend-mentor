import { Comments } from "./Types"
import {renderReply} from "./RenderReply"
import {createReplyToComment} from "../functions/CreateReplyToComment"
import { loggedUser } from "../db/db"
import { editComment } from "../functions/EditComment"
import { deletePost } from "../functions/DeletePost"
import { upvote } from "../functions/upvote"
import { downvote } from "../functions/downvote"

export const renderComment = (comment: Comments) => {
    //ul of class comments created in HTML
    const commentsUl: HTMLUListElement = document.querySelector(".comments")

    //li element dynamically create
    const newCommentLi: HTMLLIElement = document.createElement("li")
    newCommentLi.addEventListener("click", createReplyToComment)

    
    newCommentLi.innerHTML = `
        <div class="comment">
            <div class="comment-wrapper">
                <div class="votes-container votes-container-desktop">
                    <button class="upvotes">+</button>
                    <span class="score-desktop">${comment.score}</span>
                    <button class="downvotes">-</button>
                </div>
                <div class="comment-info">
                    <div class="comment-data">
                        <div class="comment-wrapper-desktop">
                            <div class="user-data">
                                <img class="avatar" src="${comment.user.image.png}" alt="avatar"></img>
                                <span class="username">${comment.user.username}</span>
                                ${comment.user.username === loggedUser.username 
                                    ? `<span class="comment-author-flag">you</span>` : ""}
                                <span class="date">${comment.createdAt}</span>
                            </div>

                            <div class="desktop-buttons">
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
                    </div>
                    
                    <p class="content">${comment.content}</p>

                    </div>    
                </div>
            </div>        
            
            <div class="buttons-container">
                <div class="votes-container">
                    <button class="upvotes">+</button>
                    <span class="score">${comment.score}</span>
                    <button class="downvotes">-</button>
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
    
    const editBtns: NodeListOf<HTMLButtonElement> = newCommentLi.querySelectorAll(".edit-comment-btn")
    editBtns.forEach(editBtn => editBtn.addEventListener("click", editComment))
    
    
    const deleteBtns: NodeListOf<HTMLButtonElement> = newCommentLi.querySelectorAll(".delete-btn")
    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener("click", deletePost))    

    const upvoteBtns: NodeListOf<HTMLButtonElement> = newCommentLi.querySelectorAll(".upvotes")
    upvoteBtns.forEach(upvoteBtn => upvoteBtn.addEventListener("click", upvote))

    const downvoteBtns: NodeListOf<HTMLButtonElement> = newCommentLi.querySelectorAll(".downvotes")
    downvoteBtns.forEach(downvoteBtn => downvoteBtn.addEventListener("click", downvote))
    
}