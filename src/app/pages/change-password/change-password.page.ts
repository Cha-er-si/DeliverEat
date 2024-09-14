import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passForm!: FormGroup;

  validationMessages = {
    email: [
      { type: 'required', message: 'Email Address is required.' },
      { type: 'email', message: 'Email Address is invalid.' },
    ],
    oldPassword: [
      { type: 'required', message: 'Old Password is required.' },
      {
        type: 'minlength',
        message: 'Old Password must be atleast 8 characters.',
      },
      {
        type: 'maxlength',
        message: 'Old Password cannot be more than 32 characters.',
      },
    ],
    newPassword: [
      { type: 'required', message: 'New Password is required.' },
      {
        type: 'minlength',
        message: 'New Password must be atleast 8 characters.',
      },
      {
        type: 'pattern',
        message:
          'New Password must have 1 uppercase, 1 lower case, 1 number, and 1 special character.',
      },
      {
        type: 'maxlength',
        message: 'New Password cannot be more than 32 characters.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm Password is required.' },
      { type: 'notMatching', message: 'Password does not match.' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthenticationService,
    private router: Router,
    private alertController: AlertController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.passForm = this.formBuilder.group(
      {
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        oldPassword: new FormControl(
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
        newPassword: new FormControl(
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
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      },
      {
        validators: this.matchingPasswordsValidator(
          'newPassword',
          'confirmPassword'
        ),
      }
    );
  }

  goBack() {
    this.navController.pop();
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

  async changePassword() {
    const email =
      this.passForm.controls['email'].hasError('required') ||
      this.passForm.controls['email'].hasError('email');
    const oldPassword =
      this.passForm.controls['oldPassword'].hasError('required') ||
      this.passForm.controls['oldPassword'].hasError('minlength') ||
      this.passForm.controls['oldPassword'].hasError('maxlength');
    const newPassword =
      this.passForm.controls['newPassword'].hasError('required') ||
      this.passForm.controls['newPassword'].hasError('minlength') ||
      this.passForm.controls['newPassword'].hasError('pattern') ||
      this.passForm.controls['newPassword'].hasError('maxlength');
    const confirmPassword =
      this.passForm.controls['confirmPassword'].hasError('required') ||
      this.passForm.controls['confirmPassword'].hasError('notMatching');

    if (!email || !newPassword || !oldPassword || !confirmPassword) {
      this.userAuthService
        .changePassword(
          this.passForm.get('email')?.value,
          this.passForm.get('oldPassword')?.value,
          this.passForm.get('newPassword')?.value
        )
        .subscribe(
          async (res) => {
            console.log(res);
            const result = JSON.parse(JSON.stringify(res));
            if (result.trans == 'success') {
              const alert = await this.alertController.create({
                header: 'Change Password Success',
                message:
                  'Password Change is successful. Please login with your new password.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/login']);
                    },
                  },
                ],
              });

              await alert.present();
            } else {
              const alert = await this.alertController.create({
                header: 'Change Password Failed',
                message:
                  'Unable to change password. Please resolve errors if there are any.',
                buttons: ['OK'],
              });

              await alert.present();
            }
          },
          async (error) => {
            console.log(error);
            const alert = await this.alertController.create({
              header: 'Change Password Failed',
              message: 'Unable to change password. Please try again later.',
              buttons: ['OK'],
            });

            await alert.present();
          }
        );
    }
  }
}
