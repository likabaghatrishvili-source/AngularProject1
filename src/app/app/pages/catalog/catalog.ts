import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '../../core/services/products';
import { Product } from '../../../core/models/product.model';
import { FilterBarComponent, PriceRange } from '../../shared/components/filter-bar/filter-bar';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';

@Component({
  standalone: true,
  selector: 'app-catalog',
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, FilterBarComponent, ProductCardComponent],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css'],
})
export class CatalogPage {
  products$ = this.products.getAll();

  q = '';
  price: PriceRange = 'all';

  constructor(private products: ProductsService) {}

  matches(p: Product): boolean {
    const qOk = !this.q.trim() || p.title.toLowerCase().includes(this.q.trim().toLowerCase());
    const priceOk = this.inPrice(p.price, this.price);
    return qOk && priceOk;
  }

  private inPrice(value: number, r: PriceRange): boolean {
    if (r === 'all') return true;
    if (r === '400+') return value >= 400;
    const [a,b] = r.split('-').map(Number);
    return value >= a && value <= b;
  }
}

