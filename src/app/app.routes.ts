import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './users/login/login.comp';
import { RegisterComponent } from './users/register/register.comp';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', loadChildren: './modules#ModulesModule' },

  { path: '**', component: NoContentComponent },
];
