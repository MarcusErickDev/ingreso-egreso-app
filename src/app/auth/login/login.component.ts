import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private store: Store<AppState>,
      private router: Router
    ){}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

      this.uiSubscription = this.store.select('ui')
      .subscribe(
        ui => {
          this.loading = ui.isLoading
        }
      )
    }
    ngOnDestroy(): void {
      this.uiSubscription.unsubscribe();
    }

  loginUsuario(){
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: "Auto close alert!",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // })

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
    .then( usuario => {
      console.log(usuario.credential);
      this.store.dispatch(stopLoading());
      // Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    });
  }

}
