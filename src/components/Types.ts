export interface LoggedUser { 
    image: {
        png: string
        webp: string
    },
    username: string
}

export interface Replies {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    voted: boolean;
    replyingTo: string;
    user: {
        image: {
            png: string;
            webp: string;
        };
        username: string;
    },
    replies?: Array<Replies>
}

export interface Comments {
    id: number
    content: string
    createdAt: string
    score: number
    voted: boolean
    user: {
        image: {
            png: string
            webp: string
        },

        username: string
    },

    replies: Array<Replies>
}