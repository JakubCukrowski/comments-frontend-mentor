import { commentsToObject } from "../index"
import { Comments, Replies } from "../components/Types"
import { loggedUser } from "../db/db"
import { updateLocalStorage } from "./UpdateLocalStorage"

export const downvote = (e: Event) => {
    const btn = e.target as Element
    
    const closestLi: HTMLLIElement = btn.closest("li")
    const userScore: HTMLSpanElement = closestLi.querySelector(".score")
    const userScoreDesktop: HTMLSpanElement = closestLi.querySelector(".score-desktop") 
    const upvotesBtn: HTMLButtonElement = closestLi.querySelector(".upvotes")
    const upvotesDesktopBtn: HTMLButtonElement = closestLi.querySelector(".upvotes-desktop")
    const downvotesBtn: HTMLButtonElement = closestLi.querySelector(".downvotes")
    const downvotesDesktopBtn: HTMLButtonElement = closestLi.querySelector(".downvotes-desktop")

    const classToRemove = "upvoted"
    const classToAdd = "downvoted"

    if (closestLi.id.startsWith("reply")) {
        const catchCommentElement: HTMLLIElement = closestLi.parentElement.closest("li")
        const catchCommentInObject: Comments = commentsToObject.find(comment => catchCommentElement.id === `comment-${comment.id}`)
        const catchReply: Replies = catchCommentInObject.replies.find(reply => closestLi.id === `reply-${reply.id}`) 

        if (catchReply.upvoted && catchReply.user.username !== loggedUser.username) {
            let number = catchReply.score
            number--

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`

            upvotesBtn.classList.remove(classToRemove)
            upvotesDesktopBtn.classList.remove(classToRemove)
            userScore.classList.remove(classToRemove)
            userScoreDesktop.classList.remove(classToRemove)

            catchReply.score = number
            catchReply.downvoted = false
            catchReply.upvoted = false

            updateLocalStorage("comments", commentsToObject)
            
        } else if (!catchReply.upvoted && !catchReply.downvoted && catchReply.user.username !== loggedUser.username) {
            let number = catchReply.score
            number--                        

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`

            catchReply.score = number
            catchReply.downvoted = true

            downvotesBtn.classList.add(classToAdd)
            downvotesDesktopBtn.classList.add(classToAdd)
            userScore.classList.add(classToAdd)
            userScoreDesktop.classList.add(classToAdd)

            updateLocalStorage("comments", commentsToObject)
            
        }

    } else {
        const catchCommentInObject: Comments = commentsToObject.find(comment => closestLi.id === `comment-${comment.id}`)

        if (catchCommentInObject.upvoted && catchCommentInObject.user.username !== loggedUser.username) {
            let number = catchCommentInObject.score
            number--

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`

            upvotesBtn.classList.remove(classToRemove)
            upvotesDesktopBtn.classList.remove(classToRemove)
            userScore.classList.remove(classToRemove)
            userScoreDesktop.classList.remove(classToRemove)

            catchCommentInObject.score = number
            catchCommentInObject.upvoted = false

            updateLocalStorage("comments", commentsToObject)

        } else if (!catchCommentInObject.upvoted 
            && !catchCommentInObject.downvoted 
            && catchCommentInObject.user.username !== loggedUser.username) {
            let number = catchCommentInObject.score
            number--                        

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`

            catchCommentInObject.score = number
            catchCommentInObject.downvoted = true

            downvotesBtn.classList.add(classToAdd)
            downvotesDesktopBtn.classList.add(classToAdd)
            userScore.classList.add(classToAdd)
            userScoreDesktop.classList.add(classToAdd)

            updateLocalStorage("comments", commentsToObject)
            
        }
    }
}