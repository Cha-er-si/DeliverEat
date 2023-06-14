import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodCartPage } from './food-cart.page';

describe('FoodCartPage', () => {
  let component: FoodCartPage;
  let fixture: ComponentFixture<FoodCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FoodCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
