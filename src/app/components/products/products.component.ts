import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { CartService } from 'src/app/service/cart.service';
import { GetProductsService } from 'src/app/service/get-products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  
  movies:Movie[] = [];
  movie!:Movie

  constructor(
    private activatedRoute:ActivatedRoute,
    private item: GetProductsService,
    private cartservice: CartService) { }

  // skirver ut alla filmer från API
  ngOnInit(): void {
   this.item.getItems().subscribe((data:Movie[]) =>{
     this.movies = data
     
   })
  }

    addToCart(movie:Movie){
      this.cartservice.addToCart(movie)
  }
}
