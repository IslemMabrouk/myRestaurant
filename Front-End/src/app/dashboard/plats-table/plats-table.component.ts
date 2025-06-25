import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-plats-table',
  templateUrl: './plats-table.component.html',
  styleUrls: ['./plats-table.component.css']
})
export class PlatsTableComponent implements OnInit {
  plats: any = []; // Array to hold users
  userInfo:any;
  displayedColumns: string[] = ['name', 'price', 'category', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private platService: PlatService, 
    private router: Router,
  private authService : AuthService) { }

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
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  openDialog(action: string, plat: any): void {
    // Placeholder for dialog logic
    console.log(`${action} action for plat:`, plat);
  }

  deletePlat(id: number): void {
    this.platService.deletePlatById(id).subscribe(
      (data) => {
        this.loadPlats();
      });
  }

  editPlat(id: number) {
    this.router.navigate([`editPlat/${this.userInfo.id}/edit-plat/${id}`])
  }

  addPlat(): void {
    this.router.navigate([`addPlat/${this.userInfo.id}`])
  }

}
