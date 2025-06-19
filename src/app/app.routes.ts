import { Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Register } from './pages/register/register';
import { Tabla } from './pages/tabla/tabla';
import { CambioContrasenia } from './pages/cambio-contrasenia/cambio-contrasenia';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TemplateComponent,
    //canActivate: canActivate,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'tabla',
        component: Tabla,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'cambioContrasenia' , component: CambioContrasenia}
];
