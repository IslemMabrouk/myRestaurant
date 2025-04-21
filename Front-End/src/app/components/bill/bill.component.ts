import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  billingForm!: FormGroup;
  
  displayedColumns: string[] = ['product', 'name', 'price', 'quantity', 'total'];
  dataSource: any[] = []; // MatTable data source
  // dataSource = [
  //   {
  //     image: 'vegetable-item-2.jpg',
  //     name: 'Awesome Broccoli',
  //     price: 69.00,
  //     quantity: 2,
  //     total: 138.00
  //   },
  //   {
  //     image: 'vegetable-item-5.jpg',
  //     name: 'Potatoes',
  //     price: 69.00,
  //     quantity: 2,
  //     total: 138.00
  //   },
  //   {
  //     image: 'vegetable-item-3.png',
  //     name: 'Big Banana',
  //     price: 69.00,
  //     quantity: 2,
  //     total: 138.00
  //   }
  // ];
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.dataSource = this.orderService.getCartItems();
    console.log(this.dataSource);
    
    const userInfo = this.authService.getUserInfo();
    

    this.billingForm = this.formBuilder.group({
      firstName: [userInfo?.firstName || ''],
        lastName: [userInfo?.lastName || ''],
        address: [''],
        pwd: [''],
        confirmPwd: [''],
        phone: [''],
        email: [userInfo?.email || '']
    });
  }

  getTotal(): number {
    return this.dataSource.reduce((acc, item) => acc + item.plat.price * item.quantity, 0);
  }
  

  placeOrder(obj:any){

  }




}
