import { AfterViewInit, Component } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'

import { category } from "../models";


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements AfterViewInit {

  categories = category

  public videoSource: any = {}
  public previewSource: any = {}

  public previewImg: any = ""
  public previewVideo: any = ""

  private totalProgress: number = 0

  constructor(private location: Location, private router: Router, private storage: Storage) { }

  ngAfterViewInit() {
    this.openChooseCategory()
  }

  // Video loading
  chooseVideo(event: any){
    this.videoSource = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.previewVideo = event.target.result
    }
  }
  uploadVideo(value: any) {
    const storageRef = ref(this.storage, 'videos/' + this.videoSource.name)
    const uploadTask = uploadBytesResumable(storageRef, this.videoSource)
    const progressBar = document.querySelector(".progress_bar") as HTMLElement // @ts-ignore

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 93;
      this.totalProgress += Math.abs(this.totalProgress - progress)
      console.log('Upload is ' + this.totalProgress + '% done')

      document.querySelector(".percent_value").innerHTML = `${Math.floor(this.totalProgress)}%`
      progressBar.style.width = `${this.totalProgress}%`
    },
    () => {},
    () => { // @ts-ignore
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        value.video_url = downloadURL
        this.uploadPreview(value)
      })
    })
  }

  // Preview loading
  choosePreview(event: any){
    this.previewSource = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result
    }
  }
  uploadPreview(value: any){
    const storageRef = ref(this.storage, 'preview/' + this.previewSource.name)
    const uploadTask = uploadBytesResumable(storageRef, this.previewSource)
    const progressBar = document.querySelector(".progress_bar") as HTMLElement // @ts-ignore

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 7;
      this.totalProgress += Math.abs((this.totalProgress - 93) - progress)
      console.log('Upload is ' + this.totalProgress + '% done');

      document.querySelector(".percent_value").innerHTML = `${Math.floor(this.totalProgress)}%`
      progressBar.style.width = `${this.totalProgress}%`
    },
    () => {},
    () => { // @ts-ignore
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        value.image_url = downloadURL
        console.log(value)
      })
    })
  }

  // Sending data to the back-side
  videoUpload(value: any, e: any) {
    const videoUpload = e.composedPath()[0]
    value.categoryId = videoUpload.querySelector(".video_category_input").dataset["id"]
    this.uploadVideo(value)
  }

  // Navigation
  chooseNav(e: any) {
    document.querySelectorAll(".navigation div").forEach(p => {
      p.classList.remove("active")
    })
    e.composedPath()[0].classList.add("active")
    document.querySelector(".pages_container").className = `pages_container ${e.composedPath()[0].dataset["nav"]}`
  }

  // Choose category selector
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
    categoryValue.value = e.composedPath()[0].innerText
    categoryValue.dataset["id"] = e.composedPath()[0].children[0].innerHTML
  }

  // Return back function
  returnBack() {
    this.location.back()
  }

}
