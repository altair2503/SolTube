
export interface AuthToken {
  user_id: number
  token: string
}

export interface User {
  userId: number,
  firstname: string,
  lastname: string,
  username: string
}

export interface Subscriptions {
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
  videoUrl: string,
  imageUrl: string,
  totalViews: number,
  uploadTime: string
}

export interface VideoAndUser {
  userId: number,
  videoId: number,
  isLiked: number,
  isViewed: boolean,
  isInPlaylist: boolean,
  isInWatchLater: boolean
}
