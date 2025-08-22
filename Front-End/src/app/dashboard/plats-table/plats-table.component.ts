import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PlatService } from 'src/app/services/plat.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-plats-table',
  templateUrl: './plats-table.component.html',
  styleUrls: ['./plats-table.component.css']
})
export class PlatsTableComponent implements OnInit {
  plats: any = []; // Array to hold users
  userInfo:any;
  displayedColumns: string[] = ['platId', 'name', 'price', 'category', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private platService: PlatService, private dialog: MatDialog,
    private router: Router, private authService : AuthService) { }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.loadPlats();
  }

  loadPlats(): void {
  this.platService.getPlats().subscribe(
    (data: any) => {
      console.log(data);
      
      if (this.userInfo.roles.includes('ROLE_ADMIN')) {
        // Admin can see all plats
        this.dataSource = new MatTableDataSource<any>(data);
      } else if (this.userInfo.roles.includes('ROLE_CHEF')) {
        // Chef can only see their own plats
        const filteredPlats = data.filter((plat:any) => plat.user.id === this.userInfo.id);
        this.dataSource = new MatTableDataSource<any>(filteredPlats);
      }
      this.dataSource.paginator = this.paginator;
    },
    (error: any) => {
      console.error('Error fetching plats:', error);
    }
  );
}


  openDialog(action: string, plat: any): void {
    // Placeholder for dialog logic
    console.log(`${action} action for plat:`, plat);
  }

  deletePlat(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this meal?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.platService.deletePlatById(id).subscribe(() => {
          this.loadPlats();
        });
      }
    });
  }
  
  editPlat(id: number) {
    this.router.navigate([`editPlat/${this.userInfo.id}/edit-plat/${id}`])
  }

  addPlat(): void {
    this.router.navigate([`addPlat/${this.userInfo.id}`])
  }

}
