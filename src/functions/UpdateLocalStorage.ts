import { Comments } from "../components/Types"

export const updateLocalStorage = (key: string, value: Comments[]) => {
    const convertToJson: string = JSON.stringify(value)
    localStorage.setItem(key, convertToJson)
}