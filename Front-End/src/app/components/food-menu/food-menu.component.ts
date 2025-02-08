import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/interfaces/Plat';
import { PlatService } from 'src/app/services/plat.service'; // Make sure you import your service

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {
  plats: Plat[] = []; // List of plats from the backend
  categories = ['Breakfast', 'Lunch', 'Dinner']; // Predefined categories
  categorizedPlats: { [key: string]: Plat[] } = {}; // A map to categorize plats

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
    this.categories.forEach(category => {
      this.categorizedPlats[category] = this.plats.filter(plat => plat.category === category);
    });
  }
}
