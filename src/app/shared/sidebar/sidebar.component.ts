import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor( private authService: AuthService,
               private router: Router
   ){}

  logout(){
    this.authService.logOut()
    .then( logout => {
      console.log(logout);
      this.router.navigate(['/login']);
    })
    .catch( err => console.error(err))
  }

}
