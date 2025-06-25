import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGrowthComponent } from './users-growth.component';

describe('UsersGrowthComponent', () => {
  let component: UsersGrowthComponent;
  let fixture: ComponentFixture<UsersGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersGrowthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
