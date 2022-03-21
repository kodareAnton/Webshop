import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { orderToApi } from 'src/app/models/OrderToApi';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService} from 'src/app/service/orders.service';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  

  cart!:Cart;
  constructor(
    private cartService: CartService, 
    private fb: FormBuilder,
    private os: OrdersService,
    private http: HttpClient)
   { }


    // är class hämtad från user.ts
   user: User[] = []

   userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    age: ['', [Validators.required]],
  });

  orderToApis: orderToApi[] = []

  ngOnInit(): void { 
    this.setCart();
    this.os.getOrderApi().subscribe((data:orderToApi[]) =>{
      this.orderToApis = data
    });
  }

  removeFromCart(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem.movie.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.movie.id, quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
    }

    // lista med ordern
    // pushar min order till classens API
  pushOrderToApi(){

    // gör om cartitems till orderrows men map
    var orderRows = this.cart.items.map((item)=>{
      return {productId: item.movie.id, amount: item.quantity}
    });

    let requestbody: orderToApi ={
      id: 0,
      companyId: 44,
      created: new Date(),
      createdBy: this.userForm.value.firstName + ' ' + this.userForm.value.lastName,
      paymenyMethod: 'paypal',
      totalPrice: this.cart.totalprice,
      status: 0,
      orderRows: orderRows
    };
    console.log(requestbody);


    return this.os.PushToApi(requestbody);
  }
}