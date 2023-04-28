import { Component, OnInit } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { VideoItemComponent } from "./video-item/video-item.component";
import { MenuConditionService } from "./menu-condition.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  activePage: string = location.pathname.slice(1)

  constructor(private menuConditionService: MenuConditionService) { }

  ngOnInit(): void {
    const menu = document.querySelector(".left")
    if(localStorage.getItem("menu") != null) { // @ts-ignore
      menu.className = localStorage.getItem("menu") // @ts-ignore
    } else menu.className = "left close"

    this.activePage = location.pathname.slice(1)
    this.setActivePageLink()
  }

  menuClose(e: any) {
    const menu = e.composedPath()[2]
    menu.classList.toggle("close")
    localStorage.setItem("menu", menu.className) // @ts-ignore
    this.menuConditionService.setMenuCondition(localStorage.getItem("menu"))
  }

  selectScreen(e: any) {
    for(let element of e.composedPath()[3].querySelectorAll("ul li")) {
      element.classList.remove("active")
    } e.composedPath()[1].classList.add("active")
  }

  setActivePageLink() {
    const pageLinksAlt = document.querySelectorAll('.left nav ul li a .icons img:first-child') // @ts-ignore
    for(let element of pageLinksAlt) {
      if(element.alt == this.activePage) {
        element.closest('li').classList.add("active")
      }
    }
  }

}
