import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plat } from 'src/app/interfaces/Plat';
import { environment } from 'src/environments/environment';

interface CartItem {
  plat: Plat;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURL = environment.BaseUrl + "/api/orders";

  private cartKey: string = 'cartItems';

  /// Observable for total quantity
  private totalQuantitySubject = new BehaviorSubject<number>(this.getTotalQuantity());
  totalQuantity$ = this.totalQuantitySubject.asObservable(); // You’ll use this in your components

  constructor(private httpClient: HttpClient) { }

  // Add item to the cart in localStorage
  addToCart(plat: Plat, quantity: number) {
    let cartItems: CartItem[] = this.getCartItems();  // Get current cart items from localStorage
    const existingItem = cartItems.find((item: CartItem) => item.plat.id === plat.id); // Explicitly type 'item'

    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cartItems.push({ plat, quantity });
    }

    // Store updated cart items back to localStorage
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems))
    this.updateTotalQuantity(); // 🔄 Update the subject
  }

  // Get cart items from localStorage
  getCartItems(): CartItem[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  getTotalQuantity(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  // order.service.ts

  increaseItemQuantity(platId: number) {
    let cartItems = this.getCartItems();
    const item = cartItems.find(i => i.plat.id === platId);
    if (item) {
      item.quantity++;
      localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
      this.updateTotalQuantity();
    }
  }

  decreaseItemQuantity(platId: number) {
    let cartItems = this.getCartItems();
    const item = cartItems.find(i => i.plat.id === platId);
    if (item && item.quantity > 1) {
      item.quantity--;
      localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
      this.updateTotalQuantity();
    }
  }

  removeItemById(id: number): void {
    const cartItems = this.getCartItems().filter(item => item.plat.id !== id);
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
    this.updateTotalQuantity();
  }

  // Clear the cart from localStorage
  clearCart() {
    localStorage.removeItem(this.cartKey);
     this.totalQuantitySubject.next(0);
  }

  private updateTotalQuantity() {
    const total = this.getTotalQuantity();
    this.totalQuantitySubject.next(total); // Notify subscribers
  }

  // Nouvelle méthode pour envoyer la commande
  placeOrder(orderData: any) {
    return this.httpClient.post(this.orderURL, orderData);
  }

  getAllOrders() {
    return this.httpClient.get(this.orderURL);
  }

  getOrdersByUserId(userId: number) {
    return this.httpClient.get<any>(`${this.orderURL}/user/${userId}`);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    console.log(`PUT ${this.orderURL}/${orderId}/status`, { status: newStatus });

    return this.httpClient.put(`${this.orderURL}/${orderId}/status`, { status: newStatus });
  }

    deleteOrderById(id: number) {
    return this.httpClient.delete(this.orderURL + "/" + id);
  }

}
