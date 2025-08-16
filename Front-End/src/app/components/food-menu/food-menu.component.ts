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
  itemsToShow: { [key: string]: number } = {};

  constructor(private platService: PlatService) { }

  ngOnInit(): void {
    this.loadPlats();
  }

  loadPlats(): void {
    this.platService.getPlats().subscribe(
      (data: any) => {
        this.plats = this.shuffleArray(data);
        this.categorizePlats();
        console.log(this.plats);
        
      },
      (error) => {
        console.error('Error loading plats:', error);
      }
    );
  }


  shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }


  categorizePlats(): void {
    this.categorizedPlats['All'] = this.plats;
    this.itemsToShow['All'] = 6;

    this.categories
      .filter(category => category !== 'All')
      .forEach(category => {
        const filteredPlats = this.plats.filter(plat => plat.category === category);
        this.categorizedPlats[category] = filteredPlats;
        this.itemsToShow[category] = 6;
      });
  }

  showMore(category: string): void {
    this.itemsToShow[category] = this.categorizedPlats[category].length;
  }

}
