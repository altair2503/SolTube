import {Component, OnInit} from '@angular/core';

import { Location } from "@angular/common";
import {JwtService} from "../jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{

  ngOnInit() {
    const token = localStorage.getItem('token')
    if(token){
      this.router.navigate(['/home'])
    }
  }

  constructor(private location: Location, private jwtSerivce: JwtService, private router: Router) { }

  signIn(value: any, e: any) {
    console.log(value)
    this.jwtSerivce.login(value.username, value.password).subscribe( (data) => {
      localStorage.setItem('token', data.token);
    })

  }

  showHidePassword(action: boolean, e: any) {
    const passwordInput = e.composedPath()[2].children[1]
    action ? this.show(passwordInput) : this.hide(passwordInput)
  }
  show(passwordInput: HTMLInputElement) {
    document.querySelector(".show_hide_btn").className = "show_hide_btn show"
    passwordInput.type = "text"
  }
  hide(passwordInput: HTMLInputElement) {
    document.querySelector(".show_hide_btn").className = "show_hide_btn hide"
    passwordInput.type = "password"
  }

  returnBack() {
    this.location.back()
  }

}
