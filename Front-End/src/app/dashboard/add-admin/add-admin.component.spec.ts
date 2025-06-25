import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddAdminComponent } from './add-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/User';

describe('AddAdminComponent', () => {
  let component: AddAdminComponent;
  let fixture: ComponentFixture<AddAdminComponent>;
  let mockUserService: any;

  const dummyUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Street',
    experience: 3,
    roles: ['admin']
  };

  beforeEach(async () => {
    mockUserService = {
      getUserById: jasmine.createSpy('getUserById').and.returnValue(of(dummyUser)),
      updateUser: jasmine.createSpy('updateUser').and.returnValue(of({ success: true })),
      addUser: jasmine.createSpy('addUser').and.returnValue(of({ success: true })),
    };

    await TestBed.configureTestingModule({
      declarations: [AddAdminComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => null // simulate Add mode by default
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form in Add mode', () => {
    expect(component.addAdminForm).toBeDefined();
    expect(component.title).toBe('Add Admin');
  });

  it('should initialize form in Edit mode and populate data', fakeAsync(() => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');

    component.ngOnInit();
    tick(); // simulate async
    fixture.detectChanges();

    expect(component.title).toBe('Edit Admin');
    expect(component.addAdminForm.get('firstName')?.value).toBe('John');
    expect(component.addAdminForm.get('pwd')?.disabled).toBeTrue();
  }));

  it('should call addUser on valid form in Add mode', () => {
    component.addAdminForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1111111111',
      address: 'Some address',
      pwd: 'secret123',
      experience: 2
    });

    component.addOrUpdateAdmin();
    expect(mockUserService.addUser).toHaveBeenCalled();
  });

  it('should call updateUser on valid form in Edit mode', fakeAsync(() => {
    component.id = '1'; // simulate edit mode
    component.addAdminForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1111111111',
      address: 'Some address',
      pwd: '', // will be disabled
      experience: 2
    });
    component.addAdminForm.get('pwd')?.disable();

    component.addOrUpdateAdmin();
    tick();
    expect(mockUserService.updateUser).toHaveBeenCalledWith('1', jasmine.objectContaining({
      firstName: 'Test',
      lastName: 'User',
      pwd: undefined
    }));
  }));

  it('should not call service if form is invalid', () => {
    component.addAdminForm.patchValue({
      email: '', // required field empty
    });
    component.addOrUpdateAdmin();
    expect(mockUserService.addUser).not.toHaveBeenCalled();
    expect(mockUserService.updateUser).not.toHaveBeenCalled();
  });

  it('should handle error during addUser', () => {
    mockUserService.addUser.and.returnValue(throwError(() => new Error('Add error')));
    component.addAdminForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1111111111',
      address: 'Some address',
      pwd: 'secret123',
      experience: 2
    });

    spyOn(console, 'error');
    component.addOrUpdateAdmin();
    expect(console.error).toHaveBeenCalledWith('Error adding admin:', jasmine.any(Error));
  });
});
