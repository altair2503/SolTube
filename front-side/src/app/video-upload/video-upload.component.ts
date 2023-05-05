import {AfterViewInit, Component} from '@angular/core';
import {Location} from "@angular/common";
import {Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from '@angular/fire/storage'
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {category} from "../models";

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements AfterViewInit {

  categories = category

  public videoSource: any = {}
  public previewSource: any = {}

  public previewIMG: any = ""
  public previewVideo: any = ""

  private totalProg: number = 0

  constructor(private location: Location, private router: Router, private storage: Storage) { }

  chooseVideo(event: any){
    this.videoSource = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.previewVideo = event.target.result
    }
  }

  UploadVideo(value: any){
    const storageRef = ref(this.storage, 'videos/' + this.videoSource.name)
    const uploadTask = uploadBytesResumable(storageRef, this.videoSource) // @ts-ignore
    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 80;
      this.totalProg += Math.abs(this.totalProg - progress)
        console.log('Upload is ' + this.totalProg + '% done');
      }, () => {

      }, () => { // @ts-ignore
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          value.video_url  = downloadURL
          this.UploadPreview(value)
        })
      }
    )
  }

  choosePreview(event: any){
    this.previewSource = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.previewIMG = event.target.result
    }
  }

  UploadPreview(value: any){
    const storageRef = ref(this.storage, 'preview/' + this.previewSource.name)
    const uploadTask = uploadBytesResumable(storageRef, this.previewSource) // @ts-ignore
    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 20;
        this.totalProg += Math.abs((this.totalProg - 80) - progress)
        console.log('Upload is ' + this.totalProg + '% done');
      }, () => {

      }, () => { // @ts-ignore
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          value.image_url = downloadURL
          console.log(value)
        })
      }
    )
  }


  ngAfterViewInit() {
    this.openChooseCategory()
  }

  videoUpload(value: any, e: any) {
    const videoUpload = e.composedPath()[0]
    value.categoryId = videoUpload.querySelector(".video_category_input").dataset["id"]
    this.UploadVideo(value)
  }

  chooseNav(e: any) {
    document.querySelectorAll(".navigation div").forEach(p => {
      p.classList.remove("active")
    })
    e.composedPath()[0].classList.add("active")
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
    categoryValue.value = e.composedPath()[0].innerText
    categoryValue.dataset["id"] = e.composedPath()[0].children[0].innerHTML
  }

  returnBack() {
    this.location.back()
  }

}
