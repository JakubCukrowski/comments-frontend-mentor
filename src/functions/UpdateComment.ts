import { commentsToObject } from "../index"
import { Comments } from "../components/Types"
import { editComment } from "./EditComment"

export const updateComment = (e: Event) => {
    const updateBtn = e.target as HTMLButtonElement
    
    const liElement = updateBtn.closest("li")
    
    const textarea = liElement.querySelector(".textarea") as HTMLTextAreaElement
    
    const commentToUpdate: Comments = commentsToObject.find(comment =>  `comment-${comment.id}` === liElement.id)

    const newP: HTMLParagraphElement = document.createElement("p")
    newP.classList.add("content")
    newP.innerText = textarea.value    

    commentToUpdate.content = textarea.value

    const commentsToJSON: string = JSON.stringify(commentsToObject)
    localStorage.setItem("comments", commentsToJSON)

    textarea.replaceWith(newP)

    updateBtn.remove()

    const editCommentBtn = liElement.querySelector(".edit-comment-btn")
    editCommentBtn.addEventListener("click", editComment)
    
}