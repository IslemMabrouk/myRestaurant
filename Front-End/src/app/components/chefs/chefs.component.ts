import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefs: any = [];

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log('Fetched users:', data);
        this.chefs = data.filter((user: any) => user.role === 'chef');
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  
  

}

