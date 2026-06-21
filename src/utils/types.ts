export interface Post {
    id: number
    content: string
    image: string
    created_at: string
    creator_photo_profile: string
    created_by: string
    creator_id: number
    updated_at: string
    updated_by: string
    likes: number
}

export interface User {
    id: number
    username: string
    full_name: string
    email: string
    photo_profile: string
    bio: string
    created_at: string
    updated_at: string
}