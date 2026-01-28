import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  count$ = this.cart.count();
  user$ = this.auth.currentUser();

  lang = 'Georgian';

  constructor(private cart: CartService, private auth: AuthService) {}

  logout() { this.auth.logout(); }
}
