import { Component } from '@angular/core';

import { Location } from '@angular/common'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private location: Location) { }

  signUp(value: any, e: any) {
    const signUp = e.composedPath()[0]

    if(value.firstname == "" || value.lastname == "" || value.username == "" || value.password == "" || value.passwordVerify == "") {

    }
    if(value.password == "" || value.passwordVerify == "") {

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
