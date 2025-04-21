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

  goToDetails(platId:Plat) {
    this.router.navigate([`foodItem/${platId}`])
  }

}
