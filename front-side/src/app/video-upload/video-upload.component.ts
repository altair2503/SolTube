import {AfterViewInit, Component} from '@angular/core';
import {Location} from "@angular/common";
import {JwtService} from "../jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements AfterViewInit {

  constructor(private location: Location, private router: Router) { }

  ngAfterViewInit() {
    this.openChooseCategory()
  }

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

  openChooseCategory() {
    document.addEventListener("click", e => {
      let target = e.target as Element // @ts-ignore
      if(target.className !== "input_block choose") {
        document.querySelector(".select_category").classList.remove("open")
      } else document.querySelector(".select_category").classList.add("open")
    })
  }
  selectCategory(e: any) {
    const categoryValue = document.querySelector(".input_block.choose input") as HTMLInputElement
    categoryValue.value = e.composedPath()[0].innerHTML
  }

  returnBack() {
    this.location.back()
  }

}
