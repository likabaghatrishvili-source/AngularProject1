import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../../core/services/auth';
import { AutofocusDirective } from '../../shared/directives/autofocus';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIf, AutofocusDirective],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginPage {
  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { email, password } = this.form.getRawValue();
    this.auth.login({ email: email!, password: password! }).subscribe({
      next: (u) => {
        this.loading = false;
        this.router.navigate([u.role === 'admin' ? '/admin' : '/catalog']);
      },
      error: (e) => {
        this.loading = false;
        this.error = e?.error?.message || 'Login failed';
      },
    });
  }
}
