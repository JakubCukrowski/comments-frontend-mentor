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
    upvoted: boolean;
    downvoted: boolean;
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
    id: number;
    content: string;
    createdAt: string;
    score: number;
    upvoted: boolean;
    downvoted: boolean;
    user: {
        image: {
            png: string;
            webp: string;
        },

        username: string;
    },

    replies: Array<Replies>
}