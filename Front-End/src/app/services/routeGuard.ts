import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if logged in
    const isLoggedIn = !!this.authService.getDecodedToken();

    if (!isLoggedIn) {
      this.dialogService.openNotConnectedDialog();
      return false; // block navigation
    }

    // Optional: keep your route.data check
    if (route.data['headerVisible'] !== undefined) {
      return route.data['headerVisible'];
    }

    return true;
  }
}
