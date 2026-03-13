import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { hasAccessToken } from './has-access-token';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (hasAccessToken()) {
    return true;
  }

  return router.parseUrl('/login');
};
