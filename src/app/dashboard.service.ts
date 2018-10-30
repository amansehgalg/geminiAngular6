import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';


interface queryResp{
  resp?:any[],
  query?:string,

}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  apiUrl = environment.apiUrl;


  getQueryResponse(query) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

    return this.http.post<queryResp>(this.apiUrl + '/connect/searchQuery', query,  {headers: headers});
  }

}
