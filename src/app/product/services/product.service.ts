import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product.module';
import { AuthService } from '../../login/login-service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private readonly API_SPRING = 'http://localhost:8081/api/v1/product';
  private headers = new HttpHeaders().set('Authorization', `${this.authService.getToken()}`);

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    // return new HttpHeaders().set('Authorization', `${token}`);
    if (!token) {
      this.router.navigate(['/login']);
    }
    return new HttpHeaders().set('Authorization', ` ${token}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.API_SPRING}/`, product, {headers: this.getHeaders()});
  }

  findAllProduct(page: number, pageSize: number, search?: string, type?: string):
   Observable<{ items: Product[], total: number }> {
    let params = new HttpParams()
        .set('page', page.toString())
        .set('size', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (type) {
      params = params.set('type', type);
    }

    const headers = this.getHeaders();
    return this.httpClient.get<{ items: Product[], total: number }>(`${this.API_SPRING}/`, { params, headers })
      .pipe(
        map(response => {
          // Garante que o campo 'items' sempre exista
          if (!response || !response.items) {
            return { items: [], total: 0 };
          }
          return response;
        })
      );
  }

  findProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_SPRING}/<id>/${id}`, {headers: this.getHeaders()});
  }

  findProductByType(type: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_SPRING}/${type}/`, {headers: this.getHeaders()});
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.API_SPRING}/${product.id}`, product, {headers: this.getHeaders()});
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.API_SPRING}/${id}`, {headers: this.getHeaders()});
  }
}
