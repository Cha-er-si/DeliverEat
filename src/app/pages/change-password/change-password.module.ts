import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { PasswordToggleShowHideComponent } from 'src/app/components/password-toggle-show-hide/password-toggle-show-hide.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    PasswordToggleShowHideComponent,
    ReactiveFormsModule,
  ],
  declarations: [ChangePasswordPage],
})
export class ChangePasswordPageModule {}
