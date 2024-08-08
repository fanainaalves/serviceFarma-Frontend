import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/v1/product/';

  constructor(private http: HttpClient) { }

  getProducts(type?: string, search?: string): Observable<Product[]> {
    let params = {};
    if (type) {
      params = { ...params, type };
    }
    if (search) {
      params = { ...params, search };
    }
    return this.http.get<Product[]>(this.baseUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }
}
