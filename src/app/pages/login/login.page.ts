import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private router: Router,
    private userAuthService: UserAuthenticationService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  login() {
    this.userAuthService.login(this.username, this.password).subscribe(
      async (res) => {
        const result = JSON.parse(JSON.stringify(res));
        if (result.trans == 'success') {
          this.router.navigate(['dashboard']);
        } else {
          const alert = await this.alertController.create({
            header: 'Login Failed',
            message: 'Unable to login your account. Please try agian.',
            buttons: ['OK'],
          });

          await alert.present();
        }
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: 'Unable to login your account. Please try agian.',
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }
}
