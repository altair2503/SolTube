import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthToken } from "./models";
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

  decodeToken(token: string): any {
    try {
      return(jwt_decode(token));
    } catch(Error) {
      return({})
    }
  }

}
