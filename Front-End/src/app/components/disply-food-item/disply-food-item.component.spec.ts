import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplyFoodItemComponent } from './disply-food-item.component';

describe('DisplyFoodItemComponent', () => {
  let component: DisplyFoodItemComponent;
  let fixture: ComponentFixture<DisplyFoodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplyFoodItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplyFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
