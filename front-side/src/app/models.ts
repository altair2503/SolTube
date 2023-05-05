export interface AuthToken {
  user_id: number
  token: string
}

export interface User {
  user_id: number,
  first_name: string,
  last_name: string,
  username: string,
  avatar: string,
}

export interface Subscription {
  chanelId: User,
  followerId: number
}

export interface Category {
  id: number,
  name: string
}

export interface Video {
  id: number,
  owner: User,
  category: Category,
  title: string,
  video_url: string,
  image_url: string,
  total_views: number,
  upload_time: Date
}

export interface VideoAndUser {
  user: User,
  video: Video,
}

