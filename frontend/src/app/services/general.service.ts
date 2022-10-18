import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../component/model/user';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  API_URL = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  public getReports(){
    return this.http.get(`${this.API_URL}/getReports}`);
  }

  public createUser(user: User){  
    return this.http.post(`${this.API_URL}/createClient`, user);
  }

}
