import { Comments } from "../components/Types"
import {updateComment} from "../functions/UpdateComment"
import { commentsToObject } from "../index"

export const editComment = (e: Event) => {
    const editBtn = e.target as HTMLButtonElement
    const liElement = e.currentTarget as HTMLLIElement       

    if (editBtn.classList.contains("edit-btn") || editBtn.classList.contains("edit-img")) {
        //content of reply
        const content: HTMLParagraphElement = liElement.querySelector(".content")

        //create new textarea element
        const textarea: HTMLTextAreaElement = document.createElement("textarea")
        textarea.classList.add("textarea") 
        textarea.value = content.innerText

        //replace paragraph with textarea element
        content.replaceWith(textarea)

        //add update button

        const replyDiv: HTMLDivElement = liElement.querySelector(".reply")
        
        const updateBtn: HTMLButtonElement = document.createElement("button")
        updateBtn.classList.add("update-btn")
        updateBtn.innerText = "UPDATE"
        updateBtn.addEventListener("click", updateComment)

        replyDiv.prepend(updateBtn)
                
        liElement.removeEventListener("click", editComment)
    }
    
    
}