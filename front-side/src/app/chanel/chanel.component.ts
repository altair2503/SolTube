import {Component, OnInit} from '@angular/core';
import {JwtService} from "../services/jwt.service";
import {Router} from "@angular/router";
import {MenuConditionService} from "../services/menu-condition.service";

@Component({
  selector: 'app-chanel',
  templateUrl: './chanel.component.html',
  styleUrls: ['./chanel.component.css']
})
export class ChanelComponent implements OnInit{

  ngOnInit() {
    // const token = localStorage.getItem('token')
    // this.user = this.jwtService.decodeToken(token)
  }

  constructor (
    private jwtService: JwtService,
    private router: Router,
    private menuConditionService: MenuConditionService
  ) { }

  getMenuCondition() {
    return this.menuConditionService.getMenuCondition()
  }

  chooseNav(e: any) {
    document.querySelectorAll(".navigation p").forEach(p => {
      p.classList.remove("active")
    })
    e.composedPath()[0].classList.add("active")
    console.log(e.composedPath()[0].dataset["nav"])
    document.querySelector(".pages_container").className = `pages_container ${e.composedPath()[0].dataset["nav"]}`
  }
  navigateToAbout() {
    document.querySelectorAll(".navigation p").forEach(p => {
      p.classList.remove("active")
    });
    document.querySelector(".navigation p:last-child").classList.add("active")
    document.querySelector(".pages_container").className = "pages_container data_about"
  }

}
