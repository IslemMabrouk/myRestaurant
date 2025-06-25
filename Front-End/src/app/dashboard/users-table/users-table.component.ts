import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  addUsers: string[] = ['Admin', 'Chef'];
  users: any = []; // Array to hold users
  dataSource = new MatTableDataSource<any>([]);  // MatTable data source
  roles: string[] = []; // Array to hold roles
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions']; // Columns to display in the table
  role: any;
  user: User = new User();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data.map((user: User) => {
          return {
            ...user,
            role: user.roles?.map((role: any) => role.name).join(', ')
          };
        });

        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  getRoleStyle(role: string): [string, string] {
    switch (role) {
      case 'ROLE_ADMIN':
        return ['admin', 'green'];
      case 'ROLE_CHEF':
        return ['Chef', 'orange'];
      case 'ROLE_CLIENT':
        return ['Client', 'blue'];
      default:
        return ['Unknown', 'gray'];
    }
  }

  onRoleSelect(role: string) {
    switch (role) {
      case 'Admin':
        this.role = role;
        this.router.navigate(['addAdmin']);
        break;
      case 'Chef':
        this.role = role;
        this.router.navigate(['addChef']);
        break;
      default:
        console.error('Unknown role:', role);
    }
  }

  getStatuStyle(status: string): [string, string] {
  switch (status) {
    case 'ROLE_ADMIN':
      return ['admin', 'chip-warning'];
    case 'ROLE_CHEF':
      return ['Chef', 'chip-success'];
    default:
      return ['client', 'chip-default'];
  }
}

getChipClass(status: string): string {
  return this.getStatuStyle(status)[1];
}


  deleteUser(userId: number): void {
    this.userService.deleteUserById(userId).subscribe(
      (data) => {
        this.loadUsers();
      });
  }

editUser(userId: number, role: string) {
  if (role === 'ROLE_ADMIN') {
    this.router.navigate([`editAdmin/${userId}`]);
  } else if (role === 'ROLE_CHEF') {
    this.router.navigate([`editChef/${userId}`]);
  } else {
    this.router.navigate([`editChef/${userId}`]);
  }
}

  addPlate(userId: number): void {
    this.router.navigate([`addPlat/${userId}`])
  }
}
