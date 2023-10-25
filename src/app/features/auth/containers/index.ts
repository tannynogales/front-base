import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';

export const containers = [
  LoginComponent,
  SignUpComponent,
  LogOutComponent,
  ResetPasswordComponent,
  EmailConfirmationComponent,
  RegisterSuccessComponent,
];

export * from './login/login.component';
export * from './sign-up/sign-up.component';
export * from './log-out/log-out.component';
export * from './reset-password/reset-password.component';
export * from './email-confirmation/email-confirmation.component';
export * from './register-success/register-success.component';
