import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
import { CommentsComponent } from './components/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
