//creates span for creation date and username

export const createSpanElement = (spanContent: string | number, className?: string) => {
    const newSpanElement: HTMLSpanElement = document.createElement("span")
    if (className) {
        newSpanElement.classList.add(className)
    }
    newSpanElement.innerText = `${spanContent}`
    return newSpanElement
}

export const createDivElement = (toAppend: Array<HTMLElement>, classList: string) => {
    const newDiv: HTMLDivElement = document.createElement("div")
    newDiv.classList.add(classList)

    newDiv.append(...toAppend)
    return newDiv
}

export const createImgElement = (image: string) => {
    const newImgElement: HTMLImageElement = document.createElement("img")
    newImgElement.setAttribute("src", image)
    newImgElement.setAttribute("alt", "avatar")
    return newImgElement
}

export const createButtonElement = (text: string | number, className?: string) => {
    const newButtonElement = document.createElement("button")
    newButtonElement.innerText = `${text}`
    if (className) {
        newButtonElement.classList.add(className)
    }
    return newButtonElement
}