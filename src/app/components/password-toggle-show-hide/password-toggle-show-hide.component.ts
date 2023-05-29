import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { IonIcon, IonInput, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-password-toggle-show-hide',
  templateUrl: './password-toggle-show-hide.component.html',
  styleUrls: ['./password-toggle-show-hide.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class PasswordToggleShowHideComponent implements OnInit {
  @ContentChild(IonInput) input!: IonInput;
  @ViewChild('eyeIcon') eyeIcon!: IonIcon;
  passwordState: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleEye() {
    this.passwordState = !this.passwordState;
    this.eyeIcon.name = this.passwordState ? 'eye' : 'eye-off';
    this.input.type = this.passwordState ? 'text' : 'password';
  }
}
