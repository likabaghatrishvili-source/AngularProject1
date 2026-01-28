import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ProductsService } from '../../core/services/products';
import { Product } from '../../../core/models/product.model';
import { GelPricePipe } from '../../shared/pipes/gel-price-pipe';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [NgIf, NgFor, AsyncPipe, ReactiveFormsModule, GelPricePipe],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminPage {
  products$ = this.products.getAll();
  editingId: string | null = null;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['', [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private products: ProductsService, private fb: FormBuilder) {}

  edit(p: Product) {
    this.editingId = p.id;
    this.form.setValue({
      title: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
    });
  }

  reset() {
    this.editingId = null;
    this.form.reset({ title:'', price:0, image:'', category:'', description:'' });
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = this.form.getRawValue();

    const req = this.editingId
      ? this.products.update(this.editingId, payload)
      : this.products.create(payload);

    req.subscribe({ next: () => { this.products$ = this.products.getAll(); this.reset(); } });
  }

  remove(id: string) {
    if (!confirm('Delete product?')) return;
    this.products.remove(id).subscribe({ next: () => (this.products$ = this.products.getAll()) });
  }
}

