import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasswordToggleShowHideComponent } from './password-toggle-show-hide.component';

describe('PasswordToggleShowHideComponent', () => {
  let component: PasswordToggleShowHideComponent;
  let fixture: ComponentFixture<PasswordToggleShowHideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordToggleShowHideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordToggleShowHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
