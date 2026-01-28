import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductsService } from '../../core/services/products';
import { CartService } from '../../core/services/cart';
import { GelPricePipe } from '../../shared/pipes/gel-price-pipe';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [NgIf, AsyncPipe, RouterLink, GelPricePipe],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetailsPage {
  id = this.route.snapshot.paramMap.get('id') || '';
  product$ = this.products.getById(this.id);

  constructor(
    private route: ActivatedRoute,
    private products: ProductsService,
    private cart: CartService
  ) {}

  add(p: any) { this.cart.add(p, 1); }
}
