import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'sales', 'revenue'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  orders: any[] = [];
  platSalesMap: { [platId: number]: { id: number, name: string, sales: number, revenue: number } } = {};

  constructor(
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (data: any) => {
        this.orders = data;
        this.processOrders();
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  processOrders(): void {
    this.orders.forEach(order => {
      order.items.forEach((item: any) => {
        const platId = item.id;
        const quantity = item.quantity || 1;
        const price = item.price || 0;

        this.addOrUpdatePlatSales(platId, item.plat.name, quantity, price);  
      });
    });
    console.log(this.platSalesMap);
    
  }

  addOrUpdatePlatSales(id: number, name: string, quantity: number, price: number): void {
    if (!this.platSalesMap[id]) {
      this.platSalesMap[id] = {
        id,
        name,
        sales: quantity,
        revenue: quantity * price
      };
    } else {
      this.platSalesMap[id].sales += quantity;
      this.platSalesMap[id].revenue += quantity * price;
    }

    this.updateBestSellersTable();
    
  }

  updateBestSellersTable(): void {
    const bestSellersArray = Object.values(this.platSalesMap);
    bestSellersArray.sort((a, b) => b.sales - a.sales);
    this.dataSource.data = bestSellersArray;
  }
}
