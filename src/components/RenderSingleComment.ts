import {loggedUser} from "./Comments"

export const renderSingleComment = (newDivElement: HTMLDivElement, textarea: HTMLTextAreaElement ) => {
    const newCommentLi: HTMLLIElement = document.createElement("li")

    newCommentLi.innerHTML = `
    <div class="comment">
        <div class="buttons-container">
            <div class="votes-container">
                <button class="upvotes">+</button>
                <span>${0}</span>
                <button class="downvote">-</button>
            </div>
            <div class="logged-user-buttons">
                <button class="delete-btn">
                    <img src="./images/icon-delete.svg" att="bin">
                    Delete
                </button>
                <button class="edit-btn">
                    <img src="./images/icon-edit.svg" att="bin">
                    Edit
                </button>
            </div>
        </div>
        <div class="comment-wrapper">
            <div class="userinfo longer">
                <img src="${loggedUser.image.png}" alt="avatar"></img>
                <span class="username">${loggedUser.username}</span>
                <span class="comment-author-flag">you</span>
                <span class="date">${"2 minutes ago"}</span>
            </div>
            <p>${(newDivElement.querySelector(".textarea") as HTMLTextAreaElement).value}</p>
        </div>
    </div>
`
document.querySelector(".comments")?.append(newCommentLi)
textarea.value = ""
}