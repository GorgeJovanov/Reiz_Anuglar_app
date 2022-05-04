import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  API_URL : string = 'https://restcountries.com/v2/all?fields=name,region,area';
  loading: boolean = false;
  constructor(private http: HttpClient) { }
  tmpProducts: Product[] = [];
  allProducts: Product[] = [];



  ngOnInit(): void {
    this.getData();
  }

    getData():any{
      this.loading = true;
      this.http.get<any[]>(`${this.API_URL}`)
    .subscribe((resp: any) =>{
        this.allProducts = resp;
        this.products = this.allProducts;
        this.loading = false; 
    });
    }
    firstFilter():any{
     this.tmpProducts = [];
     this.products = this.allProducts;
      for(let i = 0;i < this.products.length;i++){
        if(this.products[i].area < 65300){
          this.tmpProducts.push(this.products[i]);
          }
      }
      this.products = this.tmpProducts;
    }

    secondFilter():any{
      this.tmpProducts = [];
      this.products = this.allProducts;
      for(let i = 0;i < this.products.length;i++){
        if(this.products[i].region == 'Oceania'){
          this.tmpProducts.push(this.products[i]);
        }
      }this.products = this.tmpProducts;
    }

    clearFilter():any {
      this.products = this.allProducts;
    }
}

