import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reclamation } from './models/reclamation';


@Injectable({
  providedIn: 'root'
})
export class reclamationservice {
  private apiURL = 'http://localhost:3000';
   

  constructor(private http: HttpClient) {}

  getreclamations(userid:number): Observable<any> {
    
      return this.http.get<any>(`${this.apiURL}/reclamation/displayreclamations/`+userid);
    }
createReclamation(reclam:reclamation) {
        return this.http.post<reclamation>(`${this.apiURL}/reclamation/add/`, reclam);
      }
getallreclamations():Observable<any>{
    return this.http.get<any>(`${this.apiURL}/reclamation/all`);
}
  }
