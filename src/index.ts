import "./styles/main.scss"
import {renderComments} from "./components/RenderComments"
import {comments} from "./components/Comments"
import { Comments } from "./components/Types"

const commentsToJSON: string = JSON.stringify(comments)
if (localStorage.length === 0) {
    localStorage.setItem("comments", commentsToJSON)
}

const getComments = localStorage.getItem("comments")
export const commentsToObject: Array<Comments> = JSON.parse(getComments)
renderComments(commentsToObject)

