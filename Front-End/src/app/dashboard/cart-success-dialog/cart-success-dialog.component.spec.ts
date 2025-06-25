import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSuccessDialogComponent } from './cart-success-dialog.component';

describe('CartSuccessDialogComponent', () => {
  let component: CartSuccessDialogComponent;
  let fixture: ComponentFixture<CartSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSuccessDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
