import {Component, OnInit} from '@angular/core';
import {VideoService} from "../services/video.service";

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent implements OnInit {

  isAuthorized = localStorage.getItem("token")

<<<<<<< HEAD
  likedVideos: any = []
  index = 1

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getLikedVideos()
  }
=======
  ngOnInit() { }
>>>>>>> 9e58fe57a947d900e9cdf21f0f6046f2a2f47811

  clearAllLiked() {

  }

  getLikedVideos(){
    this.videoService.likedVideos().subscribe((liked)=>{
      this.likedVideos = liked
    })
  }



}
