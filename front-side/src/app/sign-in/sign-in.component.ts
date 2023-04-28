import { Component } from '@angular/core';

import { Location } from "@angular/common";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private location: Location) { }

  signIn(value: any, e: any) {
    const signIn = e.composedPath()[0] as HTMLElement
    const error = document.querySelector(".error") as HTMLElement
    this.checkToErrors(value, signIn, error)
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
