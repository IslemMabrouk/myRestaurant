import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefs: any = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.chefs = data.filter((user: any) =>
          user.roles.some((role: any) => role.name === 'ROLE_CHEF')
        );
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );

  }



}

