import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor() {
    const user = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!user);
  }

  login(res: any) {
    localStorage.setItem('token', res.token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  getDecodedToken(): any | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        this.logout(); // Token expiré → déconnexion
        return null;
      }
      return decoded;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  getUserId(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.userId ?? null;
  }


  getUserInfo(): User | null {
    const decoded = this.getDecodedToken();

    return decoded ? {
      id: decoded.userId, // <-- ici aussi !
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      roles: decoded.roles,
      phone: decoded.phone,
      address: decoded.address
    } : null;

  }

}
