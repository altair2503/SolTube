import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthToken, User} from "./models";
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  BASE_URL = 'http://localhost:8000'
  constructor(private client: HttpClient) { }

  login(username: string, password: string): Observable<AuthToken>{
    return this.client.post<AuthToken>(
      `${this.BASE_URL}/api/login/`,
      {username, password}
    )
  }

  decodeToken(token: string): User {
    let user = {} as User
    try {
      user = jwt_decode(token)
      return(user);
    } catch(Error) {
      return({username: ""} as User)
    }
  }

}
