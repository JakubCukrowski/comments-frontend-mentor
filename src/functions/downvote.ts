import { commentsToObject } from "../index"
import { Comments, Replies } from "../components/Types"
import { loggedUser } from "../db/db"
import { updateLocalStorage } from "./UpdateLocalStorage"

export const downvote = (e: Event) => {
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

        if (catchReply.voted && catchReply.user.username !== loggedUser.username) {
            let number = catchReply.score
            number--

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`

            votesBtn.classList.remove("voted")
            votesDesktopBtn.classList.remove("voted")
            userScore.classList.remove("voted")
            userScoreDesktop.classList.remove("voted")

            catchReply.score = number
            catchReply.voted = false

            updateLocalStorage("comments", commentsToObject)
        }

    } else {
        const catchCommentInObject: Comments = commentsToObject.find(comment => closestLi.id === `comment-${comment.id}`)

        if (catchCommentInObject.voted && catchCommentInObject.user.username !== loggedUser.username) {
            let number = catchCommentInObject.score
            number--

            userScore.innerText = `${number}`
            userScoreDesktop.innerText = `${number}`

            votesBtn.classList.remove("voted")
            votesDesktopBtn.classList.remove("voted")
            userScore.classList.remove("voted")
            userScoreDesktop.classList.remove("voted")

            catchCommentInObject.score = number
            catchCommentInObject.voted = false

            updateLocalStorage("comments", commentsToObject)
        }
    }
}