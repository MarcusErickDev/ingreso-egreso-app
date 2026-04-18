import { AuthService } from 'src/app/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(authService.isAuth());

  return authService.isAuth().pipe(
    tap( state => {
      if (!state) {
        router.navigate(['/login'])
      }
    })
  );
};
