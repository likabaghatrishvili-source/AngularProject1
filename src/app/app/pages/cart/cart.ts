import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart';
import { GelPricePipe } from '../../shared/pipes/gel-price-pipe';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgIf, NgFor, AsyncPipe, RouterLink, GelPricePipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartPage {
  items$ = this.cart.items();
  total$ = this.cart.total();

  constructor(private cart: CartService) {}

  inc(id: string, qty: number){ this.cart.setQty(id, qty + 1); }
  dec(id: string, qty: number){ this.cart.setQty(id, qty - 1); }
  remove(id: string){ this.cart.remove(id); }
}
