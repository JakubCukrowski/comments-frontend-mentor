import {
    createImgElement, 
    createButtonElement, 
    createDivElement, 
    createSpanElement
} from "./ElementsCreators"
import {createReply} from "./CreateReply"

export const renderReplies = (
    image: string, 
    username: string, 
    date: string, 
    content: string,
    upvotes: number,
    reply: string,
    id: number
    ) => {

    //top section of the reply
    const avatar: HTMLImageElement = createImgElement(image, "src", "alt", "avatar")
    const name: HTMLSpanElement = createSpanElement(username, "nick")
    const createdAt: HTMLSpanElement = createSpanElement(date, "created-at")

    const userInfoDiv: HTMLDivElement = createDivElement([avatar, name, createdAt], "user-info")

    //content of the reply comment
    const newPelement: HTMLParagraphElement = document.createElement("p")
    newPelement.innerText = content

    //content with user info
    const commentContentDiv: HTMLDivElement = createDivElement([userInfoDiv, newPelement], "content")

    //bottom section - buttons 
    let number: number;
    number = upvotes

    const upvoteBtn: HTMLButtonElement = createButtonElement("+")
    const downvoteBtn: HTMLButtonElement = createButtonElement("-")
    const votesSpan: HTMLSpanElement = createSpanElement(number)
    upvoteBtn.addEventListener("click", () => {
        if (number === upvotes) {
            number++
            votesSpan.innerText = `${number}`
        }
    })

    downvoteBtn.addEventListener("click", () => {
        
        if (number > upvotes) {
            number--
            votesSpan.innerText = `${number}`
        }
    })

    const upvotesDiv: HTMLDivElement = createDivElement([upvoteBtn, votesSpan, downvoteBtn], "votes")

    const replyImage: HTMLImageElement = createImgElement("./images/icon-reply.svg", "src", "alt", "arrow")
    const replyBtn: HTMLButtonElement = createButtonElement(reply, "reply-button")
    replyBtn.append(replyImage)

    replyBtn.addEventListener("click", createReply)

    const buttonsContaier = createDivElement([upvotesDiv, replyBtn], "buttons-container")

    const commentWrapperDiv: HTMLDivElement = createDivElement([commentContentDiv, buttonsContaier], "comment-wrapper")

    const replyLi: HTMLLIElement = document.createElement("li")
    replyLi.append(commentWrapperDiv)
    replyLi.id = `reply-${id}`

    return replyLi
}