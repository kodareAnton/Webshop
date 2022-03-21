import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { orderToApi } from '../models/OrderToApi';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  Url = 'https://medieinstitutet-wie-products.azurewebsites.net/api/orders'

  orderUrl = 'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=44'

  constructor(private http: HttpClient) { }
  
  // hämtar ner api för att skriva ut mina ordrar på Admin sidan
  getOrderApi(): Observable<orderToApi[]>{
    console.log(this.orderUrl);
    return this.http.get<orderToApi[]>(this.orderUrl) 
}
  // service som pushar ordern till classens API
  PushToApi(data: orderToApi){
    console.log('pushToApi');
    return this.http.post(this.Url, data).subscribe();
  }
}

