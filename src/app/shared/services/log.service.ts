import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  info(val: any) {
    console.log(val);
  }

  error(val: any) {
    console.error(val);
  }
}
