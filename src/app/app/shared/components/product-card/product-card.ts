import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { Product } from '../../../../core/models/product.model';
import { GelPricePipe } from '../../pipes/gel-price-pipe';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { HoverGlowDirective } from '../../directives/hover-glow';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NgIf, GelPricePipe, TruncatePipe, HoverGlowDirective],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
