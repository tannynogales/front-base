import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { EmailNotConfirmedComponent } from './email-not-confirmed/email-not-confirmed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const containers = [
  LoginComponent,
  SignUpComponent,
  LogOutComponent,
  ResetPasswordComponent,

  RegisterSuccessComponent,
  EmailNotConfirmedComponent,
  ForgotPasswordComponent,
];

export * from './login/login.component';
export * from './sign-up/sign-up.component';
export * from './log-out/log-out.component';
export * from './reset-password/reset-password.component';
export * from './register-success/register-success.component';
export * from './email-not-confirmed/email-not-confirmed.component';
export * from './forgot-password/forgot-password.component';
