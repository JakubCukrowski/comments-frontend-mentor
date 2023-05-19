import {updateReply} from "./UpdateReply"

export const editReply = (e: Event) => {
    const editBtn = e.target as HTMLButtonElement
    const liElement = e.currentTarget as HTMLLIElement           

    if (editBtn.classList.contains("edit-btn") || editBtn.classList.contains("edit-img")) {
        //content of reply
        const content = liElement.querySelector(".content") as HTMLParagraphElement        

        //create new textarea element
        const textarea: HTMLTextAreaElement = document.createElement("textarea")
        textarea.classList.add("textarea") 
        textarea.value = content.innerText

        //replace paragraph with textarea element
        content.replaceWith(textarea)

        //add update button

        const replyDiv = liElement.querySelector(".comment") as HTMLDivElement       
        
        const updateBtn: HTMLButtonElement = document.createElement("button")
        updateBtn.classList.add("update-btn")
        updateBtn.innerText = "UPDATE"
        updateBtn.addEventListener("click", updateReply)

        replyDiv?.append(updateBtn)
                
        liElement.removeEventListener("click", editReply)
    }
    
    
    
    
}