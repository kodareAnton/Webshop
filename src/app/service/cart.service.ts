import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart:Cart = new Cart();

  addToCart(movie: Movie):void{
    console.log(this.cart);
    
    let cartItem = this.cart.items.find(item => item.movie.id === movie.id);
    if(cartItem){
      this.changeQuantity(movie.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(movie));
  }
  removeFromCart(movieId: number): void{
    this.cart.items = 
    this.cart.items.filter(item => item.movie.id != movieId)
  }
  changeQuantity(movieId:number, quantity:number){
    let cartItem = this.cart.items.find(item => item.movie.id === movieId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart():Cart{
    return this.cart
  }

}
