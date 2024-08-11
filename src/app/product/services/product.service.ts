import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.module';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private readonly API_SPRING = 'http://localhost:8081/api/v1/product';

  constructor(private httpClient: HttpClient) { }


  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.API_SPRING}/`, product);
  }

  findAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_SPRING}/`);
  }

  findProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_SPRING}/<id>/${id}`);
  }

  findProductByType(type: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_SPRING}/${type}/`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.API_SPRING}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.API_SPRING}/${id}`);
  }
}
