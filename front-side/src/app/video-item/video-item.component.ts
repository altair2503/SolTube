import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements AfterViewInit {

  linkToVideo: string = ""

  title = '"Beautiful nature of Kazakhstan'
  chanel = "ABRAMOV MEDIA"

  private static menuCondition = localStorage.getItem("menu")

  ngAfterViewInit() {
    this.closeMoreWindow()
  }

  public getMenuCondition() {
    return VideoItemComponent.menuCondition
  }
  public static setMenuCondition(condition: string) {
    this.menuCondition = condition
  }
  openMoreWindow(e: any) {
    e.composedPath()[1].children[1].classList.toggle("open")
  }
  closeMoreWindow() {
    document.addEventListener("click", e => {
      let target = e.target as Element
      if(target.className !== "more_open_btn") {
        document.querySelector(".more_open").classList.remove("open")
      }
    })
  }

  openShareWindow(e: any) {
    if(e.composedPath()[0].children[1].innerHTML == "Share") {
      const shareWindow = e.composedPath()[6].querySelector(".share_window")
      const linkToVideo = shareWindow.querySelector("input")
      const copyToBufferBtn = shareWindow.querySelector("button")

      shareWindow.classList.add("open")
      document.body.classList.add("lock")
      e.composedPath()[1].classList.remove("open")

      linkToVideo.value = location.href
      this.linkToVideo = linkToVideo.value
    }
  }

  closeShareWindow(e: any) {
    if(e.composedPath()[0].className == "close_share") {
      e.composedPath()[3].classList.remove("open")
      document.body.classList.remove("lock")
    }
    if(e.composedPath()[0].className == "share_window open") {
      e.composedPath()[0].classList.remove("open")
      document.body.classList.remove("lock")
    }
  }

  copyToClipboard(e: any) {
    const successfullyCopied = e.composedPath()[4].querySelector(".successfully_copied")
    navigator.clipboard.writeText(this.linkToVideo)
      .then(() => {
        successfullyCopied.classList.add("show")
        setTimeout(() => {
          successfullyCopied.classList.remove("show")
        }, 3000)
      })
  }

  // playVideo() {
  //   setTimeout(() => {
  //     document.querySelector("video").classList.add("show")
  //     document.querySelector("video").play()
  //   }, 1000)
  // }
  // stopVideo() {
  //   document.querySelector("video").classList.remove("show")
  //   document.querySelector("video").pause()
  // }

}
