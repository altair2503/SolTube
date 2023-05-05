import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = 'http://localhost:8000'

  constructor(private client: HttpClient) { }

  updateUser (
    username: string,
    firstName: string,
    lastName: string
  ) {
    return this.client.put<User>(
      `${this.BASE_URL}/api/user/`,
      {
        username: username,
        first_name: firstName,
        last_name: lastName
      }
    )
  }

}
