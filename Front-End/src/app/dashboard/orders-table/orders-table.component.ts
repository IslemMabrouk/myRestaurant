import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { StatusChangeDialogComponent } from '../status-change-dialog/status-change-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  orders: any[] = [];
  userInfo: any;
  displayedColumns: string[] = ['id', 'customerName', 'items', 'totalAmount', 'status', 'orderDate', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;

  statuses: string[] = ['All', 'Pending', 'Completed'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.loadOrders();
  }

  loadOrders(): void {
    const roles = this.userInfo?.roles || [];

    if (roles.includes('ROLE_ADMIN')) {
      this.orderService.getAllOrders().subscribe(data => this.setOrdersData(data));
    } else if (roles.includes('ROLE_CHEF')) {
      this.orderService.getOrdersByUserId(this.userInfo.id).subscribe(data => this.setOrdersData(data));
    } else {
      this.setOrdersData([]);
    }

  }

  setOrdersData(orders: any[]) {
    this.orders = orders.sort((a: any, b: any) => {
      return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
    });

    this.dataSource.data = this.orders;
    this.dataSource.paginator = this.paginator;
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

  onStatusFilterChange(status: string): void {
    if (status === 'All' || !status) {
      this.dataSource.data = this.orders;
    } else {
      const statusUpper = status.toUpperCase();
      this.dataSource.data = this.orders.filter(order => order.status === statusUpper);
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeStatus(order: any) {
    const newStatus = prompt('Enter new status:', order.status);
    if (newStatus && newStatus.trim()) {
      order.status = newStatus.trim().toUpperCase();
    }
  }

  openStatusChangeDialog(order: any): void {
    const dialogRef = this.dialog.open(StatusChangeDialogComponent, {
      width: '350px',
      data: { status: order.status }
    });

    dialogRef.afterClosed().subscribe((newStatus: string) => {
      if (newStatus && newStatus !== order.status) {
        order.status = newStatus;

        this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
          next: () => {
            console.log('Order status updated successfully');
          },
          error: (err) => {
            console.error('Failed to update order status:', err);
          }
        });
      }
    });
  }


  deleteOrder(orderId: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: { message: 'Are you sure you want to delete this order?' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.orderService.deleteOrderById(orderId).subscribe(() => {
            this.loadOrders();
          });
        }
      });
    }

}
