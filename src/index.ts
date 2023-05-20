import "./styles/main.scss"
import {renderComment} from "./components/RenderComment"
import {comments} from "./db/db"
import { Comments } from "./components/Types"
import {addNewComment} from "./components/AddNewComment"

const commentsToJSON: string = JSON.stringify(comments)
if (localStorage.length === 0) {
    localStorage.setItem("comments", commentsToJSON)
}

const getComments: string = localStorage.getItem("comments")
export const commentsToObject: Array<Comments> = JSON.parse(getComments)

commentsToObject.forEach(comment => {
    renderComment(comment)
})

addNewComment()

