import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderTableComponent } from './client-order-table.component';

describe('ClientOrderTableComponent', () => {
  let component: ClientOrderTableComponent;
  let fixture: ComponentFixture<ClientOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOrderTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
