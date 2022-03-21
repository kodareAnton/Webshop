import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  // hämtar från API
  url='https://medieinstitutet-wie-products.azurewebsites.net/api/products'

  constructor(private http: HttpClient) { }

  getItems(): Observable<Movie[]>{
    console.log(this.url);
    
   return this.http.get<Movie[]>(this.url)
  }
}
