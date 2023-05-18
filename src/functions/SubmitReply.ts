import { commentsToObject } from "../index"
import { loggedUser } from "../db/db"
import { createReplyToComment } from "./CreateReplyToComment"
import { renderReply } from "../components/RenderReply"
import { Comments, Replies } from "../components/Types"
import { createReplyToReply } from "./CreateReplyToReply"
import { updateLocalStorage } from "./UpdateLocalStorage"

export const submitReply = (e: Event) => {
    //submit button
    const submitReplyButton = e.target as Element    

    //element with event target
    const tempLi = e.currentTarget as Element    

    //catching whole comment we're replying to
    const commentLi = tempLi.parentElement.closest("li")
    
    //textarea
    const textarea = tempLi.querySelector(".textarea") as HTMLTextAreaElement    

    //new reply id
    const commentsCount = commentsToObject.length
    const repliesCount = commentsToObject.map(comment => comment.replies).flat()
    let newReplyId = commentsCount + repliesCount.length + 1  
    

    const commentToReply: Comments = commentsToObject.find(comment => commentLi.id === `comment-${comment.id}`)

    let newReply: Replies

    if (submitReplyButton.classList.contains("submit-reply-btn")) { 
            
        if (tempLi.closest("li").previousElementSibling === null) {
            newReply = {
                id: newReplyId,
                    content: textarea.value.split(" ").slice(1).join(" "),
                    createdAt: "1 week ago",
                    score: 0,
                    upvoted: false,
                    downvoted: false,
                    replyingTo: commentToReply.user.username,
                    user: {
                        image: { 
                        png: loggedUser.image.png,
                        webp: loggedUser.image.webp
                        },
                        username: loggedUser.username
                },
                    
            }
            
        } else {
            const searchedReply: Replies = commentToReply.replies.find(reply => {
                return tempLi.closest("li").previousElementSibling.id === `reply-${reply.id}`
            })

            newReply = {
                id: newReplyId,
                    content: textarea.value.split(" ").slice(1).join(" "),
                    createdAt: "1 week ago",
                    score: 0,
                    upvoted: false,
                    downvoted: false,
                    replyingTo: searchedReply.user.username,
                    user: {
                        image: { 
                        png: loggedUser.image.png,
                        webp: loggedUser.image.webp
                        },
                        username: loggedUser.username
                },
                    
            }

            tempLi.closest("li").previousElementSibling.addEventListener("click", createReplyToReply)
        }

        commentToReply.replies.push(newReply)

        const newReplyLi: HTMLLIElement = renderReply(newReply)

        if (commentLi.querySelector(".replies-container") === null) {
            const newRepliesContainer: HTMLUListElement = document.createElement("ul")
            newRepliesContainer.classList.add("replies-container")
            newRepliesContainer.append(newReplyLi)
            commentLi.append(newRepliesContainer)
            
        }   else {
            const existingRepliesContainer: HTMLDivElement = commentLi.querySelector(".replies-container")
            existingRepliesContainer.append(newReplyLi)          
        }
        
        updateLocalStorage("comments", commentsToObject)

        if (!tempLi.parentElement.classList.contains("replies-container")) {
            tempLi.parentElement.remove()

        } else {
            tempLi.remove()
        }
    }

    commentLi.addEventListener("click", createReplyToComment)   
    
}