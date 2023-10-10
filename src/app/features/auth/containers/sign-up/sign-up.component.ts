import { Component, ElementRef, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  UntypedFormBuilder,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { ToastService } from '@shared/components/toast/toast.service';
import {
  createPasswordStrengthValidator,
  passwordMatchingValidatior,
} from './validators';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formSignUp: UntypedFormGroup = new UntypedFormGroup({});
  isLoading = false;
  emailAlreadyTaken!: string | null;

  constructor(
    private toastService: ToastService,
    private formBuilder: UntypedFormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    public authService: AuthService,
    private readonly title: Title
  ) {
    this.title.setTitle(`Sign-up | Curriculum`);
  }

  ngOnInit(): void {
    // this.formSignUp = this.formBuilder.group(
    //   {
    //     name: ['', {
    //       validators: [Validators.required,],
    //       asyncValidators: [],
    //       updateOn: 'change'
    //     }],
    //     email: ['juan@demo.com', {
    //       validators: [Validators.required, Validators.email],
    //       asyncValidators: [],
    //       updateOn: 'change'
    //     }],
    //     password: ['ambrosoli', {
    //       validators: [Validators.required, Validators.minLength(6)],
    //       asyncValidators: [],
    //       updateOn: 'change'
    //     }],
    //     passwordRepeat: ['ambrosoli', {
    //       validators: [],
    //       asyncValidators: [],
    //       updateOn: 'change'
    //     }],
    //   },
    //   {
    //     validators: [passwordMatchingValidatior],
    //     updateOn: 'change',
    //   });

    this.formSignUp = new UntypedFormGroup(
      {
        // name: new FormControl('Nancy', [
        //   Validators.required,
        //   Validators.minLength(2),
        //   Validators.maxLength(15)
        // ]),
        email: new UntypedFormControl('demo@demo.demo', [
          Validators.required,
          Validators.email,
        ]),
        password: new UntypedFormControl('ambrosoli', [
          Validators.required,
          Validators.minLength(6),
          // createPasswordStrengthValidator(),
          // Validators.maxLength(4)
        ]),
        passwordRepeat: new UntypedFormControl('ambrosoli', [
          // Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(12)
        ]),
      },
      {
        validators: [passwordMatchingValidatior],
        updateOn: 'change',
      }
    );
  }

  signUp(): void {
    if (this.formSignUp.valid) {
      this.try2createUser();
    } else {
      for (const key of Object.keys(this.formSignUp.controls)) {
        if (this.formSignUp.controls[key].invalid) {
          const invalidControl = this.elementRef.nativeElement.querySelector(
            '[formcontrolname="' + key + '"] input'
          );
          console.log(invalidControl);
          invalidControl.focus();
          this.formSignUp.controls[key].markAsTouched();
          break;
        }
      }
    }
  }

  try2createUser() {
    this.isLoading = true;
    this.emailAlreadyTaken = null;

    const { email, password, passwordRepeat } = this.formSignUp.value;
    this.authService.create(email, password, passwordRepeat).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isLoading = false;

        this.router.navigateByUrl('/auth/login').then(() => {
          this.toastService.addToast({
            message:
              'Cuenta creada con éxito!<br>Pronto recibirás un correo para activar tu cuenta.',
          });
        });
      },

      error: (error) => {
        this.isLoading = false;
        console.log(error);
        if (error.status == 400)
          this.emailAlreadyTaken = 'El email ya está en uso';
      },
    });

    console.log('formSignUp', this.formSignUp);
  }
}
