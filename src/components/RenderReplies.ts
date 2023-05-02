export const renderReplies = (
    score: number,
    image: string,
    name: string,
    date: string,
    content: string,
    replyingTo: string,
    id: number

) => {

    //li element dynamically create
    const newReplyLi: HTMLLIElement = document.createElement("li")
    
    newReplyLi.innerHTML = `
        <div class="reply">
            <div class="buttons-container">
                <div class="votes-container">
                    <button class="upvotes">+</button>
                    <span>${score}</span>
                    <button class="downvote">-</button>
                </div>
                <button class="reply-button">
                    <img src="./images/icon-reply.svg"></img>
                    Reply
                </button>
                </div>
                <div class="reply-wrapper">
                    <div class="userinfo">
                        <img src="${image}" alt="avatar"></img>
                        <span class="username">${name}</span>
                        <span class="date">${date}</span>
                    </div>
                <p><span class="replying-to">@${replyingTo}</span> ${content}</p>
            </div>
        </div>
    `
    newReplyLi.id = `reply-${id}`

    return newReplyLi
}