import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { END_POINTS } from '../end-points/end-points';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private BASE_URL: string = 'http://127.0.0.1:3008/';
  constructor(
    private http: HttpClient
  ) { }

  getOrganizations(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${END_POINTS.GET_ALL_ORGANIZATION}`);
  };
  getOrganizationUsers(id: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}${END_POINTS.GET_USERS_UNDER_ORGANOZATION}${id}`);
  };
  getuserByUserId(id: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}${END_POINTS.GET_USER_DATA}${id}`);
  };

  signUp(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}${END_POINTS.SIGN_UP}`, data);
  };
  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}${END_POINTS.LOGIN}`, data);
  };


}
