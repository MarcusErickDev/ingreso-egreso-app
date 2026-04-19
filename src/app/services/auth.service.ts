import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: Usuario|null;

  get user(){
    return {...this._user};
  }

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(
      fuser => {

        if (fuser) {
          this.userSubscription = this.firestore.doc(`${fuser?.uid}/usuario`).valueChanges()
            .subscribe( (firestoreUser: any) => {

              const user = Usuario.fromFirebase( firestoreUser );
              this._user = user;

              this.store.dispatch(setUser({user}))

            })
        } else {
          this._user = null;
          this.userSubscription.unsubscribe();
          this.store.dispatch(unSetUser());

        }


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
