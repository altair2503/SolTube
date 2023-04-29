import {Component, OnInit} from '@angular/core';
import {JwtService} from "../jwt.service";
import {Router} from "@angular/router";
import {User} from "../models";
import { MenuConditionService } from '../menu-condition.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  user: User

  ngOnInit() {
    const token = localStorage.getItem('token')
    this.user = this.jwtService.decodeToken(token)
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
    }); e.composedPath()[0].classList.add("active")
  }
  navigateToAbout() {
    document.querySelectorAll(".navigation p").forEach(p => {
      p.classList.remove("active")
    }); document.querySelector(".navigation p:last-child").classList.add("active")
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/home']).then()
  }

}
