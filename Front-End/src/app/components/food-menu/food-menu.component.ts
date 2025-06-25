import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/interfaces/Plat';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {
  plats: Plat[] = [];
  categories = ['All', 'Sandwich', 'Burger', 'Pizza'];
  categorizedPlats: { [key: string]: Plat[] } = {};

  constructor(private platService: PlatService) {}

  ngOnInit(): void {
    this.loadPlats();
  }

  loadPlats(): void {
    this.platService.getPlats().subscribe(
      (data: any) => {
        this.plats = data;
        this.categorizePlats();
      },
      (error) => {
        console.error('Error loading plats:', error);
      }
    );
  }

  categorizePlats(): void {
  this.categorizedPlats['All'] = this.plats; // All plats
  this.categories
    .filter(category => category !== 'All')
    .forEach(category => {
      this.categorizedPlats[category] = this.plats.filter(plat => plat.category === category);
    });
}
  
}
