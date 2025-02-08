import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefInfoComponent } from './chef-info.component';

describe('ChefInfoComponent', () => {
  let component: ChefInfoComponent;
  let fixture: ComponentFixture<ChefInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
