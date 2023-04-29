import "./styles/main.scss"

import {loggedUser, comments} from "./components/Comments"
import {renderComments} from "./components/RenderComments"
import {renderReplies} from "./components/RenderReplies"

const commentsContainer: HTMLUListElement = document.querySelector(".comments")
export const commentElements: NodeListOf<HTMLLIElement> = document.querySelectorAll("li")

comments.commentsData.forEach(comment => {
    const repliesContainer: HTMLUListElement = document.createElement("ul")
    repliesContainer.classList.add("replies-container")
    const renderedComments: HTMLLIElement = renderComments(
        comment.user.image.png, 
        comment.user.username, 
        comment.createdAt, 
        comment.content, 
        comment.score, 
        "Reply", 
        comment.id)

        comment.replies.forEach(reply => {
            const renderedReplies: HTMLLIElement = renderReplies(
                reply.user.image.png,
                reply.user.username,
                reply.createdAt,
                reply.content,
                reply.score,
                "Reply",
                reply.id
            )
            repliesContainer.append(renderedReplies)
            renderedComments.append(repliesContainer)
        })

       
    commentsContainer.append(renderedComments)
        
})


