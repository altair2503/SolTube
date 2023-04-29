import { Component, OnInit } from '@angular/core';

import { JwtService } from "../jwt.service";
import { Router } from "@angular/router";

import { User } from "../models";
import { MenuConditionService } from "../menu-condition.service";


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

  chooseNav() {

  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/home']).then()
  }

}
