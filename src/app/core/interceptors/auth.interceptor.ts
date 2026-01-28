import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('amelie_token');

  // public endpoints-ს თუ გინდა გამოტოვება
  const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/signup');
  if (!token || isAuthEndpoint) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
