import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EmailNotConfirmedComponent,
  LoginComponent,
  RegisterSuccessComponent,
  SignUpComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
  },
  {
    path: 'email-not-confirmed/:email',
    component: EmailNotConfirmedComponent,
  },
  // {
  //   path: 'logout',
  //   component: LogOutComponent,
  // },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
