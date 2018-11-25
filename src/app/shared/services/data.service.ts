import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  languagesUrl = 'assets/json/lang.json';

  constructor(private http: HttpClient) { }

  getLanguages() {
    return this.http.get(this.languagesUrl);
  }
}
