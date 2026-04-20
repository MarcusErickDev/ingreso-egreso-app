import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  userSubs!: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( ({user}) => user != null )
    )
    .subscribe( ({ user }) => this.nombre = user!.nombre );
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  logout(){
    this.authService.logOut()
    .then( logout => {
      console.log(logout);
      this.router.navigate(['/login']);
    })
    .catch( err => console.error(err))
  }

}
