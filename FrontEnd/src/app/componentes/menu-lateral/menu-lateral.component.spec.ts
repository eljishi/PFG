import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuLateralComponent } from './menu-lateral.component';

describe('MenuLateralComponent', () => {
  let component: MenuLateralComponent;
  let fixture: ComponentFixture<MenuLateralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MenuLateralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
