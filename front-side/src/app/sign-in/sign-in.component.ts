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
    console.log(value.firstname)
  }

  returnBack() {
    this.location.back()
  }

}
