import { Comments, Replies } from "../components/Types"
import { commentsToObject } from "../index"

export const deletePost = (e: Event) => {
    const btn = e.target as Element    

    const popup: HTMLDivElement = document.createElement("div")
        popup.classList.add("popup")
        

        popup.innerHTML = `
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        `

        const cancelBtn: HTMLButtonElement = document.createElement("button")
        cancelBtn.innerText = "NO, CANCEL"
        cancelBtn.classList.add("cancel-btn")
        cancelBtn.addEventListener("click", () => {
            popup.remove()
            document.body.classList.remove("disabled")
        })

        const deleteBtn: HTMLButtonElement = document.createElement("button")
        deleteBtn.innerText = "YES, DELETE"
        deleteBtn.classList.add("confirm-delete-btn")

        const buttonsContainer: HTMLDivElement = document.createElement("div")
        buttonsContainer.classList.add("buttons-container")
        buttonsContainer.append(cancelBtn, deleteBtn)

        popup.append(buttonsContainer)

        document.body.append(popup)
        document.body.classList.add("disabled")



    if (btn.closest("li").id.startsWith("reply")) {

        const selectedReply: HTMLLIElement = btn.closest("li")
        const selectedComment: HTMLLIElement = selectedReply.parentElement.closest("li")

        const selectedCommentFromLocalStorage: Comments = commentsToObject
            .find(comment => selectedComment.id === `comment-${comment.id}`)

        const selectedReplyFromLocalSotragge: Replies = selectedCommentFromLocalStorage.replies
            .find(reply => selectedReply.id === `reply-${reply.id}`)
        
        deleteBtn.addEventListener("click", () => {
            selectedReply.remove()
            popup.remove()
            document.body.classList.remove("disabled")
            const repliesWithoutSelected: Array<Replies> = selectedCommentFromLocalStorage.replies
                .filter(reply => reply.id !== selectedReplyFromLocalSotragge.id)

            selectedCommentFromLocalStorage.replies.length = 0

            repliesWithoutSelected.forEach(reply => {
                selectedCommentFromLocalStorage.replies.push(reply)
            })
        })

        const commentsToString: string = JSON.stringify(commentsToObject)
    localStorage.setItem("comments", commentsToString)

    } else {
        const commentLi: HTMLLIElement = btn.closest("li")
        const selectedComment: Comments = commentsToObject.find(comment => commentLi.id === `comment-${comment.id}`)
        
        

        deleteBtn.addEventListener("click", () => {
            commentLi.remove()
            popup.remove()
            document.body.classList.remove("disabled")

            const allCommentsWithoutSelected: Array<Comments> = commentsToObject.filter(comment => comment.id !== selectedComment.id)

            const commentsToJson: string = JSON.stringify(allCommentsWithoutSelected)
            localStorage.setItem("comments", commentsToJson)

        })
        
    }

}