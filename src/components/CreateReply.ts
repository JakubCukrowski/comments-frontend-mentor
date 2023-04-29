import { loggedUser } from "./Comments"
import { createImgElement } from "./ElementsCreators"

export const createReply = (event: Event) => {
    const button: Element = event.target as Element
    const comment = button.closest("li") as HTMLLIElement

    const allReplyCommentButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".reply-button")
    allReplyCommentButtons.forEach(button => button.removeEventListener("click", createReply))
    
    const containerDiv: HTMLDivElement = document.createElement("div")
    containerDiv.classList.add("reply-wrapper")
    
    const avatar: HTMLImageElement = createImgElement(loggedUser.image.png, "src", "alt", "avatar")

    const confirmReplyButton: HTMLButtonElement = document.createElement("button")
    confirmReplyButton.innerText = "REPLY"

    const bottomReplySection: HTMLDivElement = document.createElement("div")
    bottomReplySection.classList.add("bottom-reply-section")

    bottomReplySection.append(avatar, confirmReplyButton)

    const inputElement: HTMLInputElement = document.createElement("input")
    inputElement.type = "textarea"


    containerDiv.append(inputElement, bottomReplySection)

    const newLi: HTMLLIElement = document.createElement("li")
    newLi.append(containerDiv)

    if (comment.querySelector(".replies-container") !== null) {
        comment.querySelector(".replies-container").prepend(newLi)

    } else {
        const newUl: HTMLUListElement = document.createElement("ul")
        newUl.classList.add("new-list")
        comment.append(newUl)
        newUl.append(newLi)
    }
    
}