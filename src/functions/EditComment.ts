import {updateComment} from "../functions/UpdateComment"

export const editComment = (e: Event) => {
    const editBtn = e.target as HTMLButtonElement       


    const commentLi: HTMLLIElement = editBtn.closest("li")
    const content: HTMLParagraphElement = commentLi.querySelector(".content")
    
    //create new textarea element
    const textarea: HTMLTextAreaElement = document.createElement("textarea")
    textarea.classList.add("textarea") 
    textarea.value = content.innerText

    //replace paragraph with textarea element
    content.replaceWith(textarea)

    //add update button

    const replyDiv = commentLi.querySelector(".comment") as HTMLDivElement
    
    const updateBtn: HTMLButtonElement = document.createElement("button")
    updateBtn.classList.add("update-btn")
    updateBtn.innerText = "UPDATE"
    updateBtn.addEventListener("click", updateComment)

    replyDiv.append(updateBtn)
            
    editBtn.removeEventListener("click", editComment)        
    
}