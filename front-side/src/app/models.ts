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
    name: "Music"
  },
  {
    id: 2,
    name: "Learning"
  },
  {
    id: 3,
    name: "Gaming"
  },
  {
    id: 4,
    name: "Sport"
  },
  {
    id: 5,
    name: "Films"
  },
  {
    id: 6,
    name: "Travelling"
  },
  {
    id: 7,
    name: "Cook"
  },
  {
    id: 8,
    name: "Transport"
  },
  {
    id: 9,
    name: "Humor"
  }
]
