import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { FoodMenuComponent } from './components/food-menu/food-menu.component';
import { ChefsComponent } from './components/chefs/chefs.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReviewComponent } from './components/review/review.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { PopularDishesComponent } from './components/popular-dishes/popular-dishes.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChefInfoComponent } from './components/chef-info/chef-info.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { MatDividerModule } from '@angular/material/divider';
import { BillComponent } from './components/bill/bill.component';
import {MatListModule} from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { DisplyFoodItemComponent } from './components/disply-food-item/disply-food-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuCardComponent } from './components/menu-card/menu-card.component'; 
import { DashboardModule } from './dashboard/dashboard.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LandingComponent } from './components/landing/landing.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommentsComponent } from './components/add-review/add-review.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthInterceptor } from './services/auth.interceptor.service';
import { MatMenuModule } from '@angular/material/menu';
import { ClientSpaceComponent } from './components/client-space/client-space.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClientOrderTableComponent } from './components/client-order-table/client-order-table.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotConnectedDialogComponent } from './shared/not-connected-dialog/not-connected-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AboutComponent,
    FoodMenuComponent,
    ChefsComponent,
    ReservationComponent,
    ReviewComponent,
    FooterComponent,
    NewsComponent,
    PopularDishesComponent,
    AdminComponent,
    ChefsTableComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ChefInfoComponent,
    CartComponent,
    BillComponent,
    DisplyFoodItemComponent,
    MenuCardComponent,
    LandingComponent,
    CommentsComponent,
    ClientSpaceComponent,
    ClientOrderTableComponent,
    EditProfileComponent,
    TopBarComponent,
    NavBarComponent,
    NotConnectedDialogComponent,
  ],
  imports: [
    NoopAnimationsModule,
    NgApexchartsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatTabsModule,
    DashboardModule,
    MatSidenavModule,
    MatSnackBarModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    MatPaginatorModule,
    CommonModule,
    MatDialogModule
],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
