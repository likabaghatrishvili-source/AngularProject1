import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem, CartState } from '../../../core/models/cart.model';
import { Product } from '../../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'amelie_cart';

  private state$ = new BehaviorSubject<CartState>(this.load());

  cart(): Observable<CartState> {
    return this.state$.asObservable();
  }

  items(): Observable<CartItem[]> {
    return this.cart().pipe(map(s => s.items));
  }

  count(): Observable<number> {
    return this.items().pipe(map(items => items.reduce((sum, it) => sum + it.qty, 0)));
  }

  total(): Observable<number> {
    return this.items().pipe(map(items => items.reduce((sum, it) => sum + it.qty * it.product.price, 0)));
  }

  add(product: Product, qty = 1): void {
    const state = this.state$.value;
    const items = [...state.items];
    const i = items.findIndex(x => x.product.id === product.id);
    if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
    else items.push({ product, qty });
    this.commit({ items });
  }

  remove(productId: string): void {
    const items = this.state$.value.items.filter(x => x.product.id !== productId);
    this.commit({ items });
  }

  setQty(productId: string, qty: number): void {
    const items = this.state$.value.items.map(x =>
      x.product.id === productId ? { ...x, qty: Math.max(1, qty) } : x
    );
    this.commit({ items });
  }

  clear(): void {
    this.commit({ items: [] });
  }

  private commit(next: CartState) {
    this.state$.next(next);
    localStorage.setItem(this.KEY, JSON.stringify(next));
  }

  private load(): CartState {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? (JSON.parse(raw) as CartState) : { items: [] };
    } catch {
      return { items: [] };
    }
  }
}
