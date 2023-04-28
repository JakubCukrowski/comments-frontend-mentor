import "./styles/main.scss"

const commentsContainer: HTMLElement = document.querySelector(".comments")

interface LoggedUser { 
    image: {
        png: string
        webp: string
    },
    username: string
}

interface Comments {
    commentsData: Array<{
        id: number
        content: string
        createdAt: string
        score: number

        user: {
            image: {
                png: string
                webp: string
            },

            username: string
        },

        replies?: Array<{
            id: number
            content: string
            createdAt: string
            score: number
            replyingTo: string

            user: {
                image: {
                    png: string
                    webp: string
                }

                username: string
            }
        }>
    }>
}

const loggedUser: LoggedUser = {
    image: { 
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp"
    },
    username: "juliusomo"
    
}
    

    

const comments: Comments = {
    commentsData: [
        {
        id: 1,
        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        user: {
            image: { 
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp"
            },
            username: "amyrobson"
        },
        replies: []
        },
        
        {
        id: 2,
        content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
            image: { 
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp"
            },
            username: "maxblagun"
        },
        replies: [
            {
            id: 3,
            content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
                image: { 
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp"
                },
                username: "ramsesmiron"
            }
            },

            {
            id: 4,
            content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
                image: { 
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp"
                },
                username: "juliusomo"
            }
            }
        ]
        }
    ]
}

//creates span for creation date and username

const createSpanElement = (spanContent: string | number, className?: string) => {
    const newSpanElement: HTMLSpanElement = document.createElement("span")
    newSpanElement.classList.add(className)
    newSpanElement.innerText = `${spanContent}`
    return newSpanElement
}

const createDivElement = (toAppend: Array<HTMLElement>, classList: string) => {
    const newDiv: HTMLDivElement = document.createElement("div")
    newDiv.classList.add(classList)

    newDiv.append(...toAppend)
    return newDiv
}

const createImgElement = (image: string) => {
    const newImgElement: HTMLImageElement = document.createElement("img")
    newImgElement.setAttribute("src", image)
    newImgElement.setAttribute("alt", "avatar")
    return newImgElement
}

const createButtonElement = (text: string | number) => {
    const newButtonElement = document.createElement("button")
    newButtonElement.innerText = `${text}`
    return newButtonElement
}

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

    //bottom section - buttons 
    const upvoteBtn: HTMLButtonElement = createButtonElement("+")
    const downvoteBtn: HTMLButtonElement = createButtonElement("-")
    const votesSpan: HTMLSpanElement = createSpanElement(upvotes)
    const upvotesDiv: HTMLDivElement = createDivElement([upvoteBtn, votesSpan, downvoteBtn], "upvotes")

    const replyBtn: HTMLButtonElement = createButtonElement(reply)

    const buttonsContaier = createDivElement([upvotesDiv, replyBtn], "buttons-container")

    newLiElement.append(userInfoDiv, newPelement, buttonsContaier)
    commentsContainer.append(newLiElement)

}

comments.commentsData.forEach(comment => {
    renderComments(comment.user.image.png, comment.user.username, comment.createdAt, comment.content, comment.score, "Reply")
})