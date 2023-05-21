export const elapsedTime = (date: Date) => {   
    const currentDate: Date = new Date()
    const timeDiff = Math.floor((currentDate.getTime() - new Date(date).getTime()) / 1000)
    
    if (timeDiff < 60) {
        return "at this moment"

    } else if (timeDiff >= 60 && timeDiff < 3600) {
        return Math.floor(timeDiff / 60) === 1 
        ? `${Math.floor(timeDiff / 60)} minute ago` 
        : `${Math.floor(timeDiff / 60)} minutes ago`

    } else if (timeDiff >= 3600 && timeDiff < 24 * 3600) {
        return Math.floor(timeDiff / 3600) === 1 
        ? `${Math.floor(timeDiff / 3600)} hour ago` 
        : `${Math.floor(timeDiff / 3600)} hours ago`

    } else if (timeDiff >= 24 * 3600 && timeDiff < 7 * 24 * 3600) {
        return Math.floor(timeDiff / (24 * 3600)) === 1
        ? `${Math.floor(timeDiff / (24 * 3600))} day ago`
        : `${Math.floor(timeDiff / (24 * 3600))} days ago`

    } else if (timeDiff >= 7 * 24 * 3600 && timeDiff < 30 * 24 * 3600) {
        return Math.floor(timeDiff / ( 7 * 24 * 3600)) === 1
        ? `${Math.floor(timeDiff / (7 * 24 * 3600))} week ago`
        : `${Math.floor(timeDiff / (7 * 24 * 3600))} weeks ago`
        
    } else if (timeDiff >= 30 * 24 * 3600) {
        return Math.floor(timeDiff / (30 * 24 * 3600)) === 1
        ? `${Math.floor(timeDiff / (30 * 24 * 3600))} month ago`
        : `${Math.floor(timeDiff / (30 * 24 * 3600))} days ago`
    }
        
}