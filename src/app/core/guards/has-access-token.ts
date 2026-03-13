import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const ACCESS_TOKEN_COOKIE_KEY = 'accessToken';

function readCookieValue(cookieHeader: string, cookieName: string): string {
  const target = `${cookieName}=`;

  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim();
    if (trimmed.startsWith(target)) {
      return trimmed.slice(target.length);
    }
  }

  return '';
}

export function hasAccessToken(): boolean {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const cookieService = inject(CookieService);
    return cookieService.get(ACCESS_TOKEN_COOKIE_KEY) !== '';
  }

  const request = inject<Record<string, any> | null>(REQUEST, { optional: true });
  const cookieHeader =
    typeof request?.['headers']?.get === 'function' ? (request['headers'].get('cookie') ?? '') : '';

  return readCookieValue(cookieHeader, ACCESS_TOKEN_COOKIE_KEY) !== '';
}
