import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const x = localStorage.getItem("auth")

  let user
  if (x) {
    user = JSON.parse(x)
  }

  return user ? true : router.navigate(['/login'])
};
