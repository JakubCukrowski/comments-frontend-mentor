import { commentsToObject } from "../index"
import { Comments } from "../components/Types"

export const updateComment = (e: Event) => {
    const updateBtn = e.target as HTMLButtonElement
    const liElement = updateBtn.parentElement.parentElement as HTMLLIElement
    const commentLiElement: HTMLLIElement = liElement.parentElement.closest("li")

    const textarea = liElement.querySelector(".textarea") as HTMLTextAreaElement
    
    const commentWithReply: Array<Comments> = commentsToObject.filter(comment => commentLiElement.id === `comment-${comment.id}`)
    const searchedReply = commentWithReply[0].replies.filter(reply => liElement.id === `reply-${reply.id}`)

    searchedReply[0].content = textarea.value.split(" ").slice(1).join(" ")

    const commentsToJSON: string = JSON.stringify(commentsToObject)
    localStorage.setItem("comments", commentsToJSON)

    const newP: HTMLParagraphElement = document.createElement("p")
    newP.classList.add("content")
    newP.innerText = textarea.value.split(" ").slice(1).join(" ")

    const newSpan: HTMLSpanElement = document.createElement("span")
    newSpan.classList.add("replying-to")
    newSpan.innerText = `@${searchedReply[0].replyingTo + " "}`
    
    newP.prepend(newSpan)

    textarea.replaceWith(newP)

    updateBtn.remove()
    
}