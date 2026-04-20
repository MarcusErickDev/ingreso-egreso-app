import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

import { authGuard } from "./services/auth.guard";
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
                      .then(m => m.IngresoEgresoModule),
        // loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canMatch: [ authGuard ]
    },
    { path: '**', redirectTo: '' },

];


@NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
