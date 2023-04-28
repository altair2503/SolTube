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
    console.log(value.firstname)
  }

  returnBack() {
    this.location.back()
  }

}
