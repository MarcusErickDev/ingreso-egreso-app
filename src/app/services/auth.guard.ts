import { AuthService } from 'src/app/services/auth.service';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';


export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(authService.isAuth());

  return authService.isAuth().pipe(
    take(1),
    tap( state => {
      if (!state) {
        router.navigate(['/login'])
      }
    })
  );
};
