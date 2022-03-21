import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { orderToApi } from 'src/app/models/OrderToApi';
import { OrdersService } from 'src/app/service/orders.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userList: any;
  orderToApis: orderToApi[] = []

  constructor(private http: HttpClient,
    private os: OrdersService) { }

  ngOnInit(): void {
    this.getOrderApi()
  }

  getOrderApi(){
    this.os.getOrderApi().subscribe((data:orderToApi[]) =>{
      this.orderToApis = data
      console.log(data);
    });
  }
}
