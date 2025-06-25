import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { StatusChangeDialogComponent } from '../status-change-dialog/status-change-dialog.component';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  orders: any[] = [];
  displayedColumns: string[] = ['id', 'customerName', 'items', 'totalAmount', 'status', 'orderDate', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  statuses: string[] = ['All', 'Pending', 'Completed'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

ngOnInit(): void {
  this.loadOrders();
}

  loadOrders(): void {
   this.orderService.getAllOrders().subscribe(
    (data: any) => {
      // Sort orders by orderDate descending
      this.orders = data.sort((a: any, b: any) => {
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      });

      this.dataSource.data = this.orders;
      this.dataSource.paginator = this.paginator;
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


  deleteOrder(orderId: number): void {
    this.orderService.deleteOrderById(orderId).subscribe(
      (data) => {
        this.loadOrders();
      });
  }

}
