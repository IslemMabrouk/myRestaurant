import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//Destination Adresse // BE Server
userURL: string = 'http://localhost:9000/api/users'

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

addUser(userObj: any) {
  return this.httpClient.post(this.userURL, userObj);
}

updateUser(id: string, user: any): Observable<any> {
  return this.httpClient.put(`${this.userURL}/${id}`, user);
}
}
