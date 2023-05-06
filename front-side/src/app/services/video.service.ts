import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  BASE_URL = 'http://localhost:8000'
  constructor(private client: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.client.get<Video[]>(`${this.BASE_URL}/api/videos/`)
  }

<<<<<<< HEAD
=======
  filterVideos(id: number): Observable<Video[]> {
    return this.client.get<Video[]>(`${this.BASE_URL}/api/categories/${id}/videos`)
  }

>>>>>>> 1a2aa9209be1ee1f5b618d0f0b1c95ca94a66b99
  getVideo(id: number): Observable<Video> {
    return this.client.get<Video>(`${this.BASE_URL}/api/videos/${id}`)
  }

  postVideo(video: any): Observable<Video> {
<<<<<<< HEAD
    return this.client.post<Video>(
=======
    return this.client.post<Video> (
>>>>>>> 1a2aa9209be1ee1f5b618d0f0b1c95ca94a66b99
      `${this.BASE_URL}/api/videos/`,
      {
        "category_id": video.categoryId,
        "title": video.title,
        "description": video.description,
        "video_url": video.video_url,
        "image_url": video.image_url,
        "total_duration": video.totalDuration
      }
    )
  }

  updateVideo(video_id: number, video: Video): Observable<Video> {
    return this.client.put<Video>(
      `${this.BASE_URL}/api/videos/${video_id}`,
      video
    )
  }

  deleteVideo(video_id: number, video: Video): Observable<Video> {
    return this.client.delete<any>(
      `${this.BASE_URL}/api/videos/${video_id}`
    )
  }

}
