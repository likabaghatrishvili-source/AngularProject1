import { Routes } from '@angular/router';

import { HomePage } from './app/pages/home/home';
import { CatalogPage } from './app/pages/catalog/catalog';
import { ProductDetailsPage } from './app/pages/product-details/product-details';
import { CartPage } from './app/pages/cart/cart';
import { LoginPage } from './app/pages/login/login';
import { SignupPage } from './app/pages/signup/signup';
import { AdminPage } from './app/pages/admin/admin';
import { NotFoundPage } from './app/pages/not-found/not-found';

import { authGuard } from './app/core/guards/auth-guard';
import { adminGuard } from './app/core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Amelie Inspired' },
  { path: 'catalog', component: CatalogPage, title: 'Catalog' },
  { path: 'product/:id', component: ProductDetailsPage, title: 'Product' },
  { path: 'cart', component: CartPage, title: 'Cart', canActivate: [authGuard] },
  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'signup', component: SignupPage, title: 'Signup' },
  { path: 'admin', component: AdminPage, title: 'Admin', canActivate: [authGuard, adminGuard] },
  { path: '**', component: NotFoundPage, title: 'Not Found' },
];
