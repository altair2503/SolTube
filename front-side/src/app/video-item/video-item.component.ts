import { Component } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent {

  linkToVideo: string = ""

  title = '"Quantum dots from Sber - OLED TV 65" for 55K with an assistant and installation .apk. That good?'
  chanel = "Wylsacom"

  private static menuCondition = localStorage.getItem("menu")

  public getMenuCondition() {
    return VideoItemComponent.menuCondition
  }
  public static setMenuCondition(condition: string) {
    this.menuCondition = condition
  }
  openMoreWindow(e: any) {
    e.composedPath()[1].children[1].classList.toggle("open")
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
    console.log(e.composedPath())
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

}
