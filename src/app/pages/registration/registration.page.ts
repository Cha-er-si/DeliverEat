import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  regForm!: FormGroup;

  validationMessages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      {
        type: 'pattern',
        message:
          'Should have at least 1 character and 1 number. No special characters.',
      },
      { type: 'minlength', message: 'Username must be atleast 6 characters.' },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 18 characters.',
      },
    ],
    email: [
      { type: 'required', message: 'Email Address is required.' },
      { type: 'email', message: 'Email Address is invalid.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be atleast 8 characters.' },
      {
        type: 'pattern',
        message:
          'Password must have 1 uppercase, 1 lower case, 1 number, and 1 special character.',
      },
      {
        type: 'maxlength',
        message: 'Password cannot be more than 32 characters.',
      },
    ],
    confirmpass: [
      { type: 'required', message: 'Confirm Password is required.' },
      { type: 'notMatching', message: 'Password does not match.' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthenticationService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group(
      {
        username: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/),
            Validators.minLength(6),
            Validators.maxLength(18),
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_@.!])[A-Za-z\d_@.!]{8,}$/
            ),
            Validators.minLength(8),
            Validators.maxLength(32),
          ])
        ),
        confirmpass: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      },
      {
        validators: this.matchingPasswordsValidator('password', 'confirmpass'),
      }
    );
  }

  matchingPasswordsValidator(
    newPasswordKey: string,
    confirmPasswordKey: string
  ) {
    return (group: FormGroup) => {
      const newPassword = group.controls[newPasswordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notMatching: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  async register() {
    const email =
      this.regForm.controls['email'].hasError('required') ||
      this.regForm.controls['email'].hasError('email');
    const username =
      this.regForm.controls['username'].hasError('required') ||
      this.regForm.controls['username'].hasError('username') ||
      this.regForm.controls['username'].hasError('pattern') ||
      this.regForm.controls['username'].hasError('minlength') ||
      this.regForm.controls['username'].hasError('maxlength');
    const password =
      this.regForm.controls['password'].hasError('required') ||
      this.regForm.controls['password'].hasError('minlength') ||
      this.regForm.controls['password'].hasError('pattern') ||
      this.regForm.controls['password'].hasError('maxlength');
    const confirmPass =
      this.regForm.controls['confirmpass'].hasError('required') ||
      this.regForm.controls['confirmpass'].hasError('notMatching');

    if (!email || !username || !password || !confirmPass) {
      this.userAuthService
        .register(
          this.regForm.get('email')?.value,
          this.regForm.get('username')?.value,
          this.regForm.get('password')?.value
        )
        .subscribe(
          async (res) => {
            console.log(res);
            const result = JSON.parse(JSON.stringify(res));
            if (result.trans == 'success') {
              this.router.navigate(['/dashboard']);
            } else {
              const alert = await this.alertController.create({
                header: 'Registration Failed',
                message:
                  'Unable to register your account. Please resolve errors if there are any.',
                buttons: ['OK'],
              });

              await alert.present();
            }
          },
          async (error) => {
            console.log(error);
            const alert = await this.alertController.create({
              header: 'Registration Failed',
              message:
                'Unable to register your account. Please resolve errors if there are any.',
              buttons: ['OK'],
            });

            await alert.present();
          }
        );
    }

    // if (this.regForm.controls['email'].hasError(email.type))
    // const confirmPass = this.regForm.controls['confirmpass'].hasError(this.validationMessages.confirmpass) && (regForm.controls['confirmpass'].dirty ||regForm.controls['confirmpass'].touched);
    // if(this.regForm.controls)
    // this.userAuthService.register();
  }
}
