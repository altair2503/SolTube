import {Component, OnInit} from '@angular/core';
import {JwtService} from "../jwt.service";
import {Router} from "@angular/router";
import {User} from "../models";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User
  ngOnInit() {
    const token = localStorage.getItem('token')
    this.user = this.jwtService.decodeToken(token)
    if(this.user.username != ""){
      console.log(this.user)
    } else{
      console.log("Not")
    }

  }

  constructor(private jwtService: JwtService, private router: Router) {
  }


  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }

}
