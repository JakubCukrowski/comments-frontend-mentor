import { Comments, Replies } from "../components/Types"
import { loggedUser } from "../db/db"
import { commentsToObject } from "../index"
import { updateLocalStorage } from "./UpdateLocalStorage"

export const upvote = (e: Event) => {
    const btn = e.target as Element
    
    const closestLi: HTMLLIElement = btn.closest("li")
    const userScore: HTMLSpanElement = closestLi.querySelector(".score")
    const userScoreDesktop: HTMLSpanElement = closestLi.querySelector(".score-desktop")
    const votesBtn: HTMLButtonElement = closestLi.querySelector(".upvotes")
    const votesDesktopBtn: HTMLButtonElement = closestLi.querySelector(".upvotes-desktop")
    const downvotesBtn: HTMLButtonElement = closestLi.querySelector(".downvotes")
    const downvotesDesktopBtn: HTMLButtonElement = closestLi.querySelector(".downvotes-desktop")

    const classToAdd = "upvoted" 
    const classToRemove = "downvoted"  
    
    if (closestLi.id.startsWith("reply")) {

        const catchCommentElement: HTMLLIElement = closestLi.parentElement.closest("li")
        const catchCommentInObject: Comments = commentsToObject.find(comment => catchCommentElement.id === `comment-${comment.id}`)
        const catchReply: Replies = catchCommentInObject.replies.find(reply => closestLi.id === `reply-${reply.id}`)       

        if (!catchReply.upvoted && catchReply.downvoted && catchReply.user.username !== loggedUser.username) {
            let number = catchReply.score
            number++

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`
            catchReply.score = number

            downvotesBtn.classList.remove(classToRemove)
            downvotesDesktopBtn.classList.remove(classToRemove)
            userScore.classList.remove(classToRemove)
            userScoreDesktop.classList.remove(classToRemove)

            catchReply.downvoted = false
            catchReply.upvoted = false

        } else if (!catchReply.upvoted && catchReply.user.username !== loggedUser.username) {            
            let number = catchReply.score
            number++            

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`
            catchReply.score = number

            votesBtn.classList.add(classToAdd)
            votesDesktopBtn.classList.add(classToAdd)
            userScore.classList.add(classToAdd)
            userScoreDesktop.classList.add(classToAdd)
            
            catchReply.upvoted = true

            updateLocalStorage("comments", commentsToObject)
        }
        
    } else {
        const catchCommentInObject: Comments = commentsToObject.find(comment => closestLi.id === `comment-${comment.id}`)

        if (!catchCommentInObject.upvoted 
            && !catchCommentInObject.downvoted 
            && catchCommentInObject.user.username !== loggedUser.username) {
            let number = catchCommentInObject.score
            number++

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`
            catchCommentInObject.score = number

            votesBtn.classList.add(classToAdd)
            votesDesktopBtn.classList.add(classToAdd)
            userScore.classList.add(classToAdd)
            userScoreDesktop.classList.add(classToAdd)

            catchCommentInObject.upvoted = true

            updateLocalStorage("comments", commentsToObject)

        } else if (!catchCommentInObject.upvoted 
            && catchCommentInObject.downvoted 
            && catchCommentInObject.user.username !== loggedUser.username) {
            let number = catchCommentInObject.score
            number++

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`
            catchCommentInObject.score = number

            downvotesBtn.classList.remove(classToRemove)
            downvotesDesktopBtn.classList.remove(classToRemove)
            userScore.classList.remove(classToRemove)
            userScoreDesktop.classList.remove(classToRemove)

            catchCommentInObject.downvoted = false
            catchCommentInObject.upvoted = false

        }
        
        
    }
}