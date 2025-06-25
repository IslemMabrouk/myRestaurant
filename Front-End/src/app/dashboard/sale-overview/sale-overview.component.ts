import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis } from 'ng-apexcharts';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-sale-overview',
  templateUrl: './sale-overview.component.html',
  styleUrls: ['./sale-overview.component.css']
})
export class SaleOverviewComponent implements OnInit {
  
  orders: any[] = [];
  constructor(private orderService: OrderService) { }
    chartOptions: ApexChart = { type: 'bar', height: 350 };
  
    chartSeries: ApexAxisChartSeries = [
      { name: 'Sales', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }
    ];
  
    xAxis: ApexXAxis = { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] };
  
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (data: any) => {
        this.orders = data;
        this.updateChartData();
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  updateChartData(): void {
  const salesByMonth: { [month: string]: number } = {};

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  this.orders.forEach(order => {
    const date = new Date(order.orderDate);
    const month = monthNames[date.getMonth()];
    const price = order.price || 0;

    if (salesByMonth[month]) {
      salesByMonth[month] += price;
    } else {
      salesByMonth[month] = price;
    }
  });

  // Ensure months appear in correct calendar order
  const orderedMonths = monthNames.filter(month => salesByMonth[month]);

  this.chartSeries = [
    {
      name: 'Sales',
      data: orderedMonths.map(month => salesByMonth[month])
    }
  ];

  this.xAxis = {
    categories: orderedMonths
  };
}



}
