import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userId: string = '';
  title = 'Edit Profile';
  user = {
    firstName: '',
    lastName: '',
    email: '',
    pwd: '',
    confirmPwd: '',
    phone: '',
    address: '',
  };

  constructor(private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();

    if (userInfo && userInfo.id) {
      this.userId = userInfo.id.toString();  // 👈 important !
      this.user.firstName = userInfo.firstName || '';
      this.user.lastName = userInfo.lastName || '';
      this.user.email = userInfo.email || '';
      this.user.phone = userInfo.phone?.toString() || '';
      this.user.address = userInfo.address || '';
      this.user.pwd = '';
      this.user.confirmPwd = '';
    }


  }

  updateProfile(user: any) {
    console.log(user);
    this.userService.updateUser(this.userId, user).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);
        this.toastr.success('PROFILE UPDATED SUCCESSFULLY!');
      },
      error: (err) => {
        console.error('Error updating user', err);
        alert('Failed to update profile');
      }
    });
  }


}
