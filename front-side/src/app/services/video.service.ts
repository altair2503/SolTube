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

  getVideo(id: number): Observable<Video> {
    return this.client.get<Video>(`${this.BASE_URL}/api/videos/${id}`)
  }

  postVideo(video: any): Observable<Video> {
    return this.client.post<Video>(
      `${this.BASE_URL}/api/videos/`,
      {
        "category_id": video.categoryId,
        "title": video.title,
        "description": video.description,
        "video_url": video.video_url,
        "image_url": video.image_url
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
