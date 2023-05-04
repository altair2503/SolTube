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
  videoUrl: string,
  imageUrl: string,
  totalViews: number,
  uploadTime: string
}

export interface VideoAndUser {
  user: User,
  video: Video,
}

export const category = [
  {
    id: 1,
    name: "All"
  },
  {
    id: 2,
    name: "Trending"
  },
  {
    id: 3,
    name: "Music"
  },
  {
    id: 4,
    name: "Learning"
  },
  {
    id: 5,
    name: "Gaming"
  },
  {
    id: 6,
    name: "Sports"
  },
  {
    id: 7,
    name: "Film"
  },
  {
    id: 8,
    name: "Travelling"
  },
  {
    id: 9,
    name: "Cook"
  },
  {
    id: 10,
    name: "Fishing"
  },
  {
    id: 11,
    name: "Building"
  },
  {
    id: 12,
    name: "Live streams"
  },
]
