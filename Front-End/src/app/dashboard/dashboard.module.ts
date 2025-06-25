import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SaleOverviewComponent } from './sale-overview/sale-overview.component';
import { UsersGrowthComponent } from './users-growth/users-growth.component';
import { MatSelectModule } from '@angular/material/select';
import { AddChefComponent } from './add-chef/add-chef.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { AddPlatComponent } from './add-plat/add-plat.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { ReviewComponent } from './review/review.component';
import { CartSuccessDialogComponent } from './cart-success-dialog/cart-success-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { PlatsTableComponent } from './plats-table/plats-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { StatusChangeDialogComponent } from './status-change-dialog/status-change-dialog.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: DashboardContentComponent },
      { path: 'usersTable', component: UsersTableComponent },
      { path: 'ordersTable', component: OrdersTableComponent },
      { path: 'platsTable', component: PlatsTableComponent },
      { path: 'bestSeller', component: BestSellerComponent },
      { path: 'addChef', component: AddChefComponent },
      { path: 'editChef/:userId', component: AddChefComponent },
      { path: 'addAdmin', component: AddAdminComponent },
      { path: 'editAdmin/:userId', component: AddAdminComponent }, // Edit chef
      { path: 'addPlat/:chefId', component: AddPlatComponent },
      { path: 'editPlat/:chefId/edit-plat/:platId', component: AddPlatComponent },

]
}

];
@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    DashboardContentComponent,
    NavbarComponent,
    UsersTableComponent,
    SaleOverviewComponent,
    UsersGrowthComponent,
    AddChefComponent,
    CardComponent,
    OrdersTableComponent,
    AddPlatComponent,
    BestSellerComponent,
    ReviewComponent,
    CartSuccessDialogComponent,
    AddAdminComponent,
    PlatsTableComponent,
    StatusChangeDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    NgApexchartsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    CommonModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatChipsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule] // Optional, if you need to use it outside this module
})
export class DashboardModule { }
