import { isLoading, stopLoading } from './../shared/ui.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit{

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select('ui').subscribe( ({isLoading}) => this.loading = isLoading );

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })
  }

  guardar(){

    this.store.dispatch(isLoading())

    setTimeout(() => {
      this.store.dispatch(stopLoading());
    }, 2500);
    return;

    if (this.ingresoForm.invalid) {
      return;
    }
    console.log(this.ingresoForm.value);

    const {descripcion, monto} = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( () => {
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch( err => {
      Swal.fire('Error', err.message, 'error')
    });

  }



}
