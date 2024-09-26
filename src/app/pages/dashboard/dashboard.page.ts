import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ViewDidEnter } from '@ionic/angular';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewDidEnter {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  isLoggedIn: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private navigationController: NavController
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.dashboardService.getUserData().subscribe((res) => {
      const result = JSON.parse(JSON.stringify(res));
      console.log('result', result);
      if (result.trans == 'failed') {
        this.router.navigate(['/login']);
      }

      if (result.trans == 'expired') {
        this.dashboardService.refreshToken().subscribe((res) => {
          const result = JSON.parse(JSON.stringify(res));
          if (result.trans == 'success') {
            this.dashboardService.getUserData();
            this.navigationController.navigateRoot('/dashboard', {
              animated: false,
              animationDirection: 'back',
            });
          }
        });
      }

      if (result.user) {
        this.firstName = result.user.firstName;
      }
    });
  }
}
