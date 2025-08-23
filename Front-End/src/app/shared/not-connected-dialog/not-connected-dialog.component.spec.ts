import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConnectedDialogComponent } from './not-connected-dialog.component';

describe('NotConnectedDialogComponent', () => {
  let component: NotConnectedDialogComponent;
  let fixture: ComponentFixture<NotConnectedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotConnectedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotConnectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
