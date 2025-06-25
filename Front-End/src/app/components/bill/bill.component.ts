import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataSource = this.orderService.getCartItems();
    console.log(this.dataSource);

    const userInfo = this.authService.getUserInfo();


    this.billingForm = this.formBuilder.group({
      firstName: [userInfo?.firstName || ''],
      lastName: [userInfo?.lastName || ''],
      address: [userInfo?.address || ''],
      phone: [userInfo?.phone || ''],
      email: [userInfo?.email || ''],
    });
  }

  getTotal(): number {
    return this.dataSource.reduce((acc, item) => acc + item.plat.price * item.quantity, 0);
  }


  placeOrder(): void {
    const userInfo = this.authService.getUserInfo();
    if (!userInfo) {
      console.error('Utilisateur non connecté.');
      return;
    }

    const orderItems = this.dataSource.map(item => ({
      quantity: item.quantity,
      price: item.plat.price, // le prix unitaire du plat
      plat: {
        id: item.plat.id
      }
    }));

    const order = {
      status: 'PENDING',
      orderDate: new Date().toISOString(),
      price: this.getTotal(),
      user: {
        id: userInfo.id
      },
      items: orderItems
    };

    this.orderService.placeOrder(order).subscribe(
      (res) => {
        console.log('Commande enregistrée avec succès :', res);
        this.toastr.success('ORDER ADDED SUCCESSFULLY!');
        this.orderService.clearCart();
        this.dataSource = [];
      },
      (error) => {
        console.error('Erreur lors de enregistrement de la commande :', error);
      }
    );
  }






}
