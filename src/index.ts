import "./styles/main.scss"
import {
    createSpanElement, 
    createButtonElement, 
    createDivElement,
    createImgElement
} from "./components/ElementsCreators"
import {loggedUser, comments} from "./components/Comments"

const commentsContainer: HTMLElement = document.querySelector(".comments")

const renderComments = (
    image: string, 
    username: string, 
    date: string, 
    content: string,
    upvotes: number,
    reply: string
    ) => {
    const newLiElement: HTMLLIElement = document.createElement("li")

    //top section of the comment
    const newImage: HTMLImageElement = createImgElement(image)
    const name: HTMLSpanElement = createSpanElement(username, "nick")
    const createdAt: HTMLSpanElement = createSpanElement(date, "created-at")

    const userInfoDiv: HTMLDivElement = createDivElement([newImage, name, createdAt], "user-info")

    //content of the comment
    const newPelement: HTMLParagraphElement = document.createElement("p")
    newPelement.innerText = content

    //content with user info
    const commentContentDiv: HTMLDivElement = createDivElement([userInfoDiv, newPelement], "content")

    //bottom section - buttons 
    const upvoteBtn: HTMLButtonElement = createButtonElement("+")
    const downvoteBtn: HTMLButtonElement = createButtonElement("-")
    const votesSpan: HTMLSpanElement = createSpanElement(upvotes)
    const upvotesDiv: HTMLDivElement = createDivElement([upvoteBtn, votesSpan, downvoteBtn], "votes")

    const replyBtn: HTMLButtonElement = createButtonElement(reply, "reply-button")
    replyBtn.addEventListener("click", (e: Event) => {
        newLiElement.append(document.createElement("div"))
        
    })

    const buttonsContaier = createDivElement([upvotesDiv, replyBtn], "buttons-container")

    newLiElement.append(commentContentDiv, buttonsContaier)
    commentsContainer.append(newLiElement)

}

comments.commentsData.forEach(comment => {
    renderComments(comment.user.image.png, comment.user.username, comment.createdAt, comment.content, comment.score, "Reply")
})
