import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUsuario(){
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
    .then( usuario => {
      console.log(usuario.credential);
      this.router.navigate(['/']);
    })
    .catch( err => console.error(err) )
  }

}
