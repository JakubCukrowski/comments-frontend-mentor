import { commentsToObject } from "../index"
import { Comments, Replies } from "../components/Types"
import { updateLocalStorage } from "./UpdateLocalStorage"

export const updateReply = (e: Event) => {
    const updateBtn = e.target as HTMLButtonElement
    const liElement = updateBtn.parentElement.parentElement as HTMLLIElement
    const commentLiElement: HTMLLIElement = liElement.parentElement.closest("li")

    const textarea = liElement.querySelector(".textarea") as HTMLTextAreaElement
    
    const commentWithReply: Comments | undefined = commentsToObject.find(comment => commentLiElement.id === `comment-${comment.id}`)
    const searchedReply: Replies = commentWithReply.replies.find(reply => liElement.id === `reply-${reply.id}`)

    if (textarea.value.split(" ")[0].startsWith("@")) {
        searchedReply.content = textarea.value.split(" ").slice(1).join(" ")
    } else {
        searchedReply.content = textarea.value
    }

    updateLocalStorage("comments", commentsToObject)

    const newP: HTMLParagraphElement = document.createElement("p")
    newP.classList.add("content")
    newP.innerText = textarea.value.split(" ")[0].startsWith("@") ? textarea.value.split(" ").slice(1).join(" ") : textarea.value

    const newSpan: HTMLSpanElement = document.createElement("span")
    newSpan.classList.add("replying-to")
    newSpan.innerText = `@${searchedReply.replyingTo + " "}`
    
    newP.prepend(newSpan)

    textarea.replaceWith(newP)

    updateBtn.remove()
    
}