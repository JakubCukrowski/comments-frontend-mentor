import { commentsToObject } from "../index"
import { loggedUser } from "../components/Comments"
import { createReplyToComment } from "./CreateReplyToComment"
import { renderReply } from "../components/RenderReply"
import { Comments, Replies } from "../components/Types"

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
    const repliesCount = commentsToObject.map(comment => comment.replies)
    const newReplyId = commentsCount + repliesCount.length + 1    

    const commentToReply: Array<Comments> = commentsToObject.filter(comment => commentLi.id === `comment-${comment.id}`)

    if (submitReplyButton.classList.contains("submit-reply-btn")) {
               
        const newReply: Replies = {
            id: newReplyId,
                content: textarea.value.split(" ").slice(1).join(" "),
                createdAt: "1 week ago",
                score: 0,
                replyingTo: commentToReply[0].user.username,
                user: {
                    image: { 
                    png: loggedUser.image.png,
                    webp: loggedUser.image.webp
                    },
                    username: loggedUser.username
                },
        }
            commentToReply[0].replies.push(newReply)

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
        
        const commentsToJSON: string = JSON.stringify(commentsToObject)
        localStorage.setItem("comments", commentsToJSON)
        tempLi.parentElement.remove()
    }

    commentLi.addEventListener("click", createReplyToComment)
    
}