import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy{

  userSubs!: Subscription;
  ingEgrSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ){}

  ngOnInit(): void {
    this. userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( ({user} )=> {
      console.log('user', user);
      this.ingEgrSubs = this.ingresoEgresoService.initIngresosEgresosListener(user!.uid)
        .subscribe( ingresosEgresosFB => {
          console.log(ingresosEgresosFB);
          this.store.dispatch(setItems( {items: ingresosEgresosFB} ))
        })
    })
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingEgrSubs.unsubscribe();
  }

}
