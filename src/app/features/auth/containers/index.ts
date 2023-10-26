import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { EmailNotConfirmedComponent } from './email-not-confirmed/email-not-confirmed.component';

export const containers = [
  LoginComponent,
  SignUpComponent,
  LogOutComponent,
  ResetPasswordComponent,
  EmailConfirmationComponent,
  RegisterSuccessComponent,
  EmailNotConfirmedComponent,
];

export * from './login/login.component';
export * from './sign-up/sign-up.component';
export * from './log-out/log-out.component';
export * from './reset-password/reset-password.component';
export * from './email-confirmation/email-confirmation.component';
export * from './register-success/register-success.component';
export * from './email-not-confirmed/email-not-confirmed.component';
