import { Movie } from "./movie";

export class CartItem{
    constructor(movie:Movie){
        this.movie = movie;
        // this.price;
    }
    movie:Movie;
    quantity: number = 1;

    get price():number{
        return this.movie.price * this.quantity;
    }
}

