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
    
    if (closestLi.id.startsWith("reply")) {

        const catchCommentElement: HTMLLIElement = closestLi.parentElement.closest("li")
        const catchCommentInObject: Comments = commentsToObject.find(comment => catchCommentElement.id === `comment-${comment.id}`)
        const catchReply: Replies = catchCommentInObject.replies.find(reply => closestLi.id === `reply-${reply.id}`)       

        if (!catchReply.voted && catchReply.user.username !== loggedUser.username) {            
            let number = catchReply.score
            number++

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`
            catchReply.score = number

            votesBtn.classList.add("voted")
            votesDesktopBtn.classList.add("voted")
            userScore.classList.add("voted")
            userScoreDesktop.classList.add("voted")
            
            catchReply.voted = true

            updateLocalStorage("comments", commentsToObject)
        }
        
    } else {
        const catchCommentInObject: Comments = commentsToObject.find(comment => closestLi.id === `comment-${comment.id}`)

        if (!catchCommentInObject.voted && catchCommentInObject.user.username !== loggedUser.username) {
            let number = catchCommentInObject.score
            number++

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`
            catchCommentInObject.score = number

            votesBtn.classList.add("voted")
            votesDesktopBtn.classList.add("voted")
            userScore.classList.add("voted")
            userScoreDesktop.classList.add("voted")

            catchCommentInObject.voted = true

            updateLocalStorage("comments", commentsToObject)
        }
        
        
    }
}