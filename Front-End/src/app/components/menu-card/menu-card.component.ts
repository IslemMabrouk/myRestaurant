import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  goToDetails() {
    this.router.navigate(["foodItem"])
  }

}
