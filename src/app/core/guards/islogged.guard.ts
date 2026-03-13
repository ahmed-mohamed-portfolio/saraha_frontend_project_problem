import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { hasAccessToken } from './has-access-token';

export const isloggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (hasAccessToken()) {
    return router.parseUrl('/messages');
  }

  return true;
};
