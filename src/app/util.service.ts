import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getData(){
    let myDate=new Date(); 
    return{
      get(){
        return myDate;
      },
      set(date:Date){
        myDate=date;
      },
    }   
  }
}
