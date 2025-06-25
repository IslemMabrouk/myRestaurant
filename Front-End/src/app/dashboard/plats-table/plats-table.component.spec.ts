import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsTableComponent } from './plats-table.component';

describe('PlatsTableComponent', () => {
  let component: PlatsTableComponent;
  let fixture: ComponentFixture<PlatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
