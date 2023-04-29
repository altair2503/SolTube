import {Component, OnInit} from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { JwtService } from "../jwt.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  ngOnInit() {
    if(localStorage.getItem('token'))  this.router.navigate(['/home']).then()
  }

  constructor(private location: Location, private jwtService: JwtService, private router: Router) { }

  signIn(value: any, e: any) {
    this.jwtService.login(value.username, value.password).subscribe( (data) => {
      localStorage.setItem('token', data.token)

      const signIn = e.composedPath()[0] as HTMLElement
      const error = document.querySelector(".error") as HTMLElement

      this.checkToErrors(value, signIn, error)
      this.checkToToken(data.token, signIn, error)
    })
  }
  checkToErrors(value: any, signIn: HTMLElement, error: HTMLElement) {
    error.classList.add("show")
    if(value.username == "" || value.password == "") {
      error.innerHTML = "Fill in all the required fields !"
      signIn.querySelectorAll(".input_block").forEach(inputBlock => {
        if(inputBlock.querySelector("input").value == "") {
          inputBlock.classList.add("fill_all")
          setTimeout(() => {
            inputBlock.classList.remove("fill_all")
            error.classList.remove("show")
          }, 3000)
        }
      })
    }
    return
  }
  checkToToken(token: string, signIn: HTMLElement, errorOrSuccess: HTMLElement) {
    errorOrSuccess.classList.add("show")
    if(token) {
      errorOrSuccess.innerHTML = "Successful login to the SolTube !"
      setTimeout(() => {
        this.router.navigate(['/home']).then()
      }, 1500)
    } else {
      errorOrSuccess.innerHTML = "Check your email or password !"
      signIn.querySelectorAll(".input_block").forEach(inputBlock => {
        inputBlock.classList.add("fill_all")
        inputBlock.querySelector("input").value = ""
        setTimeout(() => {
          inputBlock.classList.remove("fill_all")
          errorOrSuccess.classList.remove("show")
        }, 3000)
      })
    }
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
