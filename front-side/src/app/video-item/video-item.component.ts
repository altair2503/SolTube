import {AfterViewInit, Component, Input} from '@angular/core';
import {MenuConditionService} from "../services/menu-condition.service";
import {Video} from "../models";

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements AfterViewInit {

  @Input() videoType: number
  @Input() historyItem: boolean
  @Input() isChanel: boolean
  @Input() video: Video = {} as Video

  linkToVideo: string = ""

  title = 'Beautiful nature of Kazakhstan'
  chanel = "ABRAMOV MEDIA"

  title2 = '"Quantum dots from Sber - OLED TV 65" for 55K with assistant and installation .apk. That good?'
  chanel2 = "Wylsacom"

  constructor(private menuConditionService: MenuConditionService) { }

  ngAfterViewInit() {
    this.closeMoreWindow()
  }

  getMenuCondition() {
    return this.menuConditionService.getMenuCondition()
  }

  openMoreWindow(e: any) {
    e.composedPath()[1].children[1].classList.toggle("open")
  }
  closeMoreWindow() {
    document.addEventListener("click", e => {
      let target = e.target as Element
      if(target.className != "more_open_btn") {
        document.querySelectorAll(".more_open").forEach(moreOpen => {
          moreOpen.classList.remove("open")
        })
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

      if(document.querySelector("video")) document.querySelector("video").pause()
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

  deleteFromHistory(id: number) {

  }

  deleteFromLiked(id: number) {

  }

  deleteFromLiked() {

  }

}
