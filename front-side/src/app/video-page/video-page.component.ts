import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {skip} from "rxjs";

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements AfterViewInit {

  videoCondition: boolean

  constructor(private elementRef:ElementRef) {
    this.videoCondition = false
  }

  ngAfterViewInit() {
    // Initialize video documents
    const video = this.elementRef.nativeElement.querySelector("video")
    const videoContainer = this.elementRef.nativeElement.querySelector(".video_container")
    // Video option functions
    this.checkVideoCondition(video)
    this.actionsWithKeyboard(video)
    this.fullScreenChange(videoContainer)
    this.miniPlayerChange(video, videoContainer)
    this.checkVolumeChanges(video, videoContainer)
    this.durationTotal(video)
    this.currentTimeProgress(video)
    this.handleInputChange()
  }

  // Play and pause actions
  playPauseAction() {
    const video = document.querySelector("video")
    this.togglePlay(video)
  }
  togglePlay(video: any) {
    (video.paused) ? video.play() : video.pause()
  }
  checkVideoCondition(video: any) {
    video.addEventListener("play", () => { this.videoCondition = true })
    video.addEventListener("pause", () => { this.videoCondition = false })
  }

  // Manage video by keyboard
  actionsWithKeyboard(video: any) {
    document.addEventListener("keydown", e => {
      const tagName = document.activeElement.tagName.toLowerCase()
      if(tagName === "input") return
      switch(e.key.toLowerCase()) { // @ts-ignore
        case " ":
          if(tagName === "button") return
        case "k":
          this.togglePlay(video)
          break
        case "f":
          this.toggleFullScreenMode()
          break
        case "i":
          this.toggleMiniPlayerMode()
          break
        case "m":
          this.videoMute()
          break
        case "arrowleft":
        case "j":
          this.skip(-5)
          break
        case "arrowright":
        case "l":
          this.skip(5)
          break
      }
    })
  }

  // Volume options
  videoMute() {
    document.querySelector("video").muted = !document.querySelector("video").muted
  }
  checkVolumeChanges(video: any, videoContainer: any) {
    video.addEventListener("volumechange", () => { // @ts-ignore
      document.querySelector(".volume_slider").value = video.volume
      let volumeLevel

      if(video.muted || video.volume === 0) { // @ts-ignore
        document.querySelector(".volume_slider").value = 0
        volumeLevel = "muted"
      }
      else if(video.volume >= .5) volumeLevel = "high"
      else volumeLevel = "low"

      videoContainer.dataset.volumeLevel = volumeLevel
    })
  }
  volumeSlider(e: any) {
    document.querySelector("video").volume = e.target.value // @ts-ignore
    document.querySelector("video").muted = e.target.value === 0
  }
  handleInputChange() {
    const input = document.querySelector('input[type="range"]')
    input.addEventListener("input", e => {
      let target = e.target as HTMLInputElement

      const min = target.min
      const max = target.max
      const val = target.value // @ts-ignore

      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    })
  }

  // Duration
  durationTotal(video: any) {
    video.addEventListener("loadeddata", () => {
      document.querySelector(".total_time").textContent = this.formatDuration(video.duration)
    })
  }
  currentTimeProgress(video: any) {
    video.addEventListener("timeupdate", () => {
      document.querySelector(".current_time").textContent = this.formatDuration(video.currentTime)
    })
  }
  leadingZeroFormatter(): Intl.NumberFormat {
    return new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2
    })
  }
  formatDuration(time: any): any {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)

    if(hours === 0) return `${minutes}:${this.leadingZeroFormatter.call("").format(seconds)}`
    else return `${hours}:${this.leadingZeroFormatter.call("").format(minutes)}
                :${this.leadingZeroFormatter.call("").format(seconds)}`
  }
  skip(value: number) {
    document.querySelector("video").currentTime += value
  }


  // View models
  toggleFullScreenMode() {
    if(document.fullscreenElement == null) {
      document.querySelector(".video_container").requestFullscreen().then()
    } else document.exitFullscreen().then()
  }
  toggleMiniPlayerMode() {
    if(document.querySelector(".video_container").classList.contains("mini_player")) {
      document.exitPictureInPicture().then()
    } else document.querySelector("video").requestPictureInPicture().then()
  }
  fullScreenChange(videoContainer: any) {
    document.addEventListener("fullscreenchange", () => {
      videoContainer.classList.toggle("full_screen", document.fullscreenElement)
    })
  }
  miniPlayerChange(video: any, videoContainer: any) {
    video.addEventListener("enterpictureinpicture", () => { videoContainer.classList.add("mini_player") })
    video.addEventListener("leavepictureinpicture", () => { videoContainer.classList.remove("mini_player") })
  }

  // Video timeline options
  handleTimelineUpdate(e: any) {
    const rect = document.querySelector(".timeline_container").getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    const previewImgNumber = Math
  }

}
