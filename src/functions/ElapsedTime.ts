export const elapsedTime = (date: Date) => {   
    const currentDate: Date = new Date()
    const timeDiff = Math.floor((currentDate.getTime() - new Date(date).getTime()) / 1000)
    
    return `${timeDiff} seconds ago`
    
}