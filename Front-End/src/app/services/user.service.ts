import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Destination Adresse // BE Server
  userURL = environment.BaseUrl + "/api/users";

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(this.userURL)
  }

  getUserById(id: number) {
    return this.httpClient.get(this.userURL + "/" + id);
  }

  deleteUserById(id: number) {
    return this.httpClient.delete(this.userURL + "/" + id);
  }
  
  login(loginData: { email: string, pwd: string }): Observable<any> {
    return this.httpClient.post(`${this.userURL}/login`, loginData);
  }

  addUser(userObj: User) {
    return this.httpClient.post(this.userURL + "/signup", userObj);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.httpClient.put(`${this.userURL}/${id}`, user);
  }
}
