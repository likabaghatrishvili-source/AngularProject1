import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserRole } from '../../../core/models/user.model';

type LoginPayload = { email: string; password: string };
type SignupPayload = { name: string; email: string; password: string };

type AuthResponse = {
  token: string;   // JWT
  user: User;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'amelie_token';
  private readonly USER_KEY = 'amelie_user';
  private readonly API = 'http://localhost:3000/api'; // შეცვალე შენი backend-ზე

  private user$ = new BehaviorSubject<User | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  currentUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): boolean {
    const u = this.user$.value;
    return u?.role === 'admin';
  }

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<AuthResponse>(`${this.API}/auth/login`, payload).pipe(
      tap((res) => this.persist(res)),
      map((res) => res.user)
    );
  }

  signup(payload: SignupPayload): Observable<User> {
    return this.http.post<AuthResponse>(`${this.API}/auth/signup`, payload).pipe(
      tap((res) => this.persist(res)),
      map((res) => res.user)
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.user$.next(null);
  }

  private persist(res: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    this.user$.next(res.user);
  }

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  // სურვილის შემთხვევაში JWT-დან role ამოიღე
  decodeRoleFromToken(token: string): UserRole | null {
    try {
      const payload = token.split('.')[1];
      const json = JSON.parse(atob(payload));
      return (json?.role as UserRole) ?? null;
    } catch {
      return null;
    }
  }
}
