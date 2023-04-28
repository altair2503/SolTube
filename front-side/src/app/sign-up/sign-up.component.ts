import {AfterViewInit, Component} from '@angular/core';

import { Location } from '@angular/common'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  username = "azikkw"

  constructor(private location: Location) { }

  signUp(value: any, e: any) {
    const signUp = e.composedPath()[0] as HTMLElement
    const error = document.querySelector(".error") as HTMLElement
    this.checkToErrors(value, signUp, error)
  }
  checkToErrors(value: any, signUp: HTMLElement, error: HTMLElement) {
    error.classList.add("show")
    if(value.firstname == "" || value.lastname == "" || value.username == "" || value.password == "" || value.passwordVerify == "") {
      error.innerHTML = "Fill in all the required fields !"
      signUp.querySelectorAll(".input_block").forEach(inputBlock => {
        if(inputBlock.querySelector("input").value == "") {
          inputBlock.classList.add("fill_all")
          setTimeout(() => {
            inputBlock.classList.remove("fill_all")
            error.classList.remove("show")
          }, 3000)
        }
      })
    } else if(value.password.length < 8 || value.passwordVerify < 8) {
      error.innerHTML = "The password must be at least 8 characters long !"
      signUp.querySelectorAll(".input_block.password").forEach(inputBlock => {
        inputBlock.querySelector("input").value = ""
        inputBlock.classList.add("fill_all")
        setTimeout(() => {
          inputBlock.classList.remove("fill_all")
          error.classList.remove("show")
        }, 3000)
      })
    } else if(value.password != value.passwordVerify) {
      error.innerHTML = "Confirm the password to complete the registration !"
      signUp.querySelectorAll(".input_block.password").forEach(inputBlock => {
        inputBlock.querySelector("input").value = ""
        inputBlock.classList.add("fill_all")
        setTimeout(() => {
          inputBlock.classList.remove("fill_all")
          error.classList.remove("show")
        }, 3000)
      })
    }
  }
  existUsername() {
    const usernameInput = document.querySelector(".username_input") as HTMLInputElement
    if(usernameInput.value == this.username) {
      document.querySelector(".username_exist").classList.add("show")
    } else {
      document.querySelector(".username_exist").classList.remove("show")
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
