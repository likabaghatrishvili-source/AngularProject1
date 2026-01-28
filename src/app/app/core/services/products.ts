import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API = 'http://localhost:3000/api'; // შეცვალე
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/products`).pipe(shareReplay(1));
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/products/${id}`);
  }

  // admin CRUD (თუ backend გაქვს)
  create(p: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.API}/admin/products`, p);
  }
  update(id: string, p: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.API}/admin/products/${id}`, p);
  }
  remove(id: string): Observable<{ ok: true }> {
    return this.http.delete<{ ok: true }>(`${this.API}/admin/products/${id}`);
  }
}
