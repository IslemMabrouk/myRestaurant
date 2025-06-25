import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';
import { AboutComponent } from './components/about/about.component';
import { ChefsComponent } from './components/chefs/chefs.component';
import { CartComponent } from './components/cart/cart.component';
import { BillComponent } from './components/bill/bill.component';
import { DisplyFoodItemComponent } from './components/disply-food-item/disply-food-item.component';
import { FoodMenuComponent } from './components/food-menu/food-menu.component';
import { LandingComponent } from './components/landing/landing.component';
import { single } from 'rxjs';
import { ClientSpaceComponent } from './components/client-space/client-space.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: LandingComponent },
      { path: "about", component: AboutComponent },
      { path: 'register', component: SignupComponent },
      { path: 'editProfile', component: EditProfileComponent },
      { path: 'signin', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'chefs', component: ChefsComponent },
      { path: 'chefsTable', component: ChefsTableComponent },
      { path: 'cart', component: CartComponent },
      { path: 'bill', component: BillComponent },
      { path: 'foodItem/:platId', component: DisplyFoodItemComponent },
      { path: 'foodMenu', component: FoodMenuComponent },
      { path: 'clientSpace/:userId', component: ClientSpaceComponent },
    ]
  },
  {
    path: 'dashboard',
    loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    // canActivate: [routeGuard],  // Apply the guard here

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
