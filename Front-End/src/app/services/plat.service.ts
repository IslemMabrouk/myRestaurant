import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plat } from '../interfaces/Plat';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  //Destination Adresse // BE Server
  platURL = environment.BaseUrl + "/api/plats";

  constructor(private httpClient: HttpClient) { }

  getPlats(): Observable<{ plats: Plat[] }> {
    return this.httpClient.get<{ plats: Plat[] }>(this.platURL);  // Ensure this matches the response structure
  }

  getPlatById(id: any) {
    return this.httpClient.get(this.platURL + "/" + id);
  }

  deletePlatById(id: number) {
    return this.httpClient.delete(this.platURL + "/" + id);
  }

  addPlat(platObj: any) {
    return this.httpClient.post(this.platURL, platObj);
  }

  updatePlat(id:number, playerObj: any) {
    return this.httpClient.put(`${this.platURL}/${id}`, playerObj);
  }

}
