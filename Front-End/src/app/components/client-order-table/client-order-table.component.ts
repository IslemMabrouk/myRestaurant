import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-client-order-table',
  templateUrl: './client-order-table.component.html',
  styleUrls: ['./client-order-table.component.css']
})
export class ClientOrderTableComponent implements OnInit {

  orders: any[] = [];
  currentUserId: any;
  displayedColumns: string[] = ['id', 'items', 'totalAmount', 'status', 'orderDate'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();

    this.orderService.getOrdersByUserId(this.currentUserId).subscribe(
      (data: any) => {
        this.orders = data.sort((a: any, b: any) => {
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      });
        this.dataSource.data = data
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 1000);

      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


getStatuStyle(status: string): [string, string] {
  switch (status) {
    case 'PENDING':
      return ['Pending', 'chip-warning'];
    case 'COMPLETED':
      return ['Completed', 'chip-success'];
    default:
      return ['Unknown', 'chip-default'];
  }
}

getChipClass(status: string): string {
  return this.getStatuStyle(status)[1];
}


}