import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EmailNotConfirmedComponent,
  ForgotPasswordComponent,
  LoginComponent,
  RegisterSuccessComponent,
  ResetPasswordComponent,
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
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
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
