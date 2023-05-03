import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {JwtService} from "../jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent {

  constructor(private location: Location, private router: Router) { }

  videoUpload(value: any, e: any) {

  }

  chooseNav(e: any) {
    document.querySelectorAll(".navigation button").forEach(p => {
      p.classList.remove("active")
    })
    e.composedPath()[0].classList.add("active")
    console.log(e.composedPath()[0].dataset["nav"])
    document.querySelector(".pages_container").className = `pages_container ${e.composedPath()[0].dataset["nav"]}`
  }

  returnBack() {
    this.location.back()
  }

}
