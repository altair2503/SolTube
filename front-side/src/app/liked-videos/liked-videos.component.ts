import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent implements OnInit {

  isAuthorized = localStorage.getItem("token")

  title2 = '"Quantum dots from Sber - OLED TV 65" for 55K with assistant and installation .apk. That good?'
  chanel2 = "Wylsacom"

  ngOnInit() { }

  clearAllLiked() {

  }

}
