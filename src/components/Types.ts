export interface LoggedUser { 
    image: {
        png: string
        webp: string
    },
    username: string
}

export interface Comments {
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