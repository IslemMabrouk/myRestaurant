import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  displayedColumns: string[] = ['product', 'name', 'price', 'quantity', 'total'];
  dataSource = [
    {
      image: 'vegetable-item-2.jpg',
      name: 'Awesome Broccoli',
      price: 69.00,
      quantity: 2,
      total: 138.00
    },
    {
      image: 'vegetable-item-5.jpg',
      name: 'Potatoes',
      price: 69.00,
      quantity: 2,
      total: 138.00
    },
    {
      image: 'vegetable-item-3.png',
      name: 'Big Banana',
      price: 69.00,
      quantity: 2,
      total: 138.00
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
