import { isLoading, stopLoading } from './../shared/ui.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy{

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  loadingSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui')
    .subscribe( ({isLoading}) => this.loading = isLoading );

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar(){

    this.store.dispatch(isLoading())

    if (this.ingresoForm.invalid) {
      return;
    }
    console.log(this.ingresoForm.value);

    const {descripcion, monto} = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( () => {
      this.ingresoForm.reset();
      this.store.dispatch(stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch( err => {
      this.store.dispatch(stopLoading());
      Swal.fire('Error', err.message, 'error')
    });

  }



}
