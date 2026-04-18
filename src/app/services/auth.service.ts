import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(
      state => {
        console.log('state',state);
        console.log('state',state?.uid);
      }
    )
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log({nombre, email, password});
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
        const newUser = new Usuario( user!.uid, nombre, email );
        return this.firestore.doc(`${user?.uid}/usuario`)
        .set( {...newUser} );
      });
  }

  loginUsuario(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }
}
