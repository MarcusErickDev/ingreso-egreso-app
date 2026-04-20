import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const uid = this.authService.user.uid;
    const ingresoEgresoData = { ...ingresoEgreso };
    delete ingresoEgresoData.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos`)
        .collection('items')
        .add( ingresoEgresoData )
  }

  initIngresosEgresosListener(uid: string) {

    return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => {
          return snapshot.map ( doc =>
            ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            })
          )
        })
      )
  }

  borrarIngresoEgreso( uidItem?: string ) {

    const uid = this.authService.user.uid;
    return this.firestore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete();

  }



}
