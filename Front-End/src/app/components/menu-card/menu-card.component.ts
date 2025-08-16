import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from 'src/app/interfaces/Plat';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  @Input() item:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getImageByCategory(category: string): string {
  switch (category) {
    case 'Burger':
      return 'assets/img/food_item/food_item_1.png';
    case 'Pizza':
      return 'assets/img/food_item/food_item_4.png';
    case 'Sandwich':
      return 'assets/img/food_item/food_item_5.jpeg';
    default:
      return 'assets/img/food_item/default.png';
  }
}


  goToDetails(platId:Plat) {
    this.router.navigate([`foodItem/${platId}`])
  }

}
