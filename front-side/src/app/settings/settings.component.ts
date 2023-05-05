import {AfterViewInit, Component, OnInit} from '@angular/core';

import { User } from "../models";
import { JwtService } from "../services/jwt.service";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  user: User

  constructor(private userService: UserService, private jwtService: JwtService) { }

  ngOnInit() {
    this.getUser()
  }
  ngAfterViewInit() {
    this.setUserUpdateInputValues (
      document.querySelector(".update_username"),
      document.querySelector(".update_fname"),
      document.querySelector(".update_lname")
    )
  }

  getUser() {
    this.jwtService.getUser().subscribe((user) => {
      this.user = user
    })
  }

  chooseNav(e: any) {
    document.querySelectorAll(".navigation p").forEach(p => {
      p.classList.remove("active")
    })
    e.composedPath()[0].classList.add("active")
    document.querySelector(".pages_container").className = `pages_container ${e.composedPath()[0].dataset["nav"]}`
  }

  setUserUpdateInputValues(username: HTMLInputElement, firstName: HTMLInputElement, lastName: HTMLInputElement) {
    setTimeout(() => {
      username.value = this.user.username
      firstName.value = this.user.first_name
      lastName.value = this.user.last_name
    }, 0)
  }

  updateUser(value: any, e: any) {
    const updateUserForm = e.composedPath()[0]
    const success = document.querySelector(".notification")

    if(value.username == "") value.username = updateUserForm.querySelector(".update_username").value
    if(value.firstname == "") value.firstname = updateUserForm.querySelector(".update_fname").value
    if(value.lastname == "") value.lastname = updateUserForm.querySelector(".update_lname").value

    if(updateUserForm.querySelector(".user_update_btn").className == "user_update_btn active") {
      this.userService.updateUser(value.username, value.firstname, value.lastname).subscribe((user) => {
        this.user.username = user.username
        this.user.first_name = user.first_name
        this.user.last_name = user.last_name
      },
      () => {},
      () => {
        success.classList.add("show")
        setTimeout(() => {
          success.classList.remove("show")
          location.reload()
        }, 2000)
      })
    }
  }

  makeButtonActive() {
    const username = document.querySelector(".update_username") as HTMLInputElement
    const description = document.querySelector(".update_description") as HTMLInputElement
    const firstName = document.querySelector(".update_fname") as HTMLInputElement
    const lastName = document.querySelector(".update_lname") as HTMLInputElement

    if(username.value != this.user.username || firstName.value != this.user.first_name || lastName.value != this.user.last_name) {
      document.querySelector(".user_update_btn").classList.add("active")
    } else document.querySelector(".user_update_btn").classList.remove("active")
  }

}
