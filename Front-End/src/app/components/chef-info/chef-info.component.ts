import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chef-info',
  templateUrl: './chef-info.component.html',
  styleUrls: ['./chef-info.component.css']
})
export class ChefInfoComponent implements OnInit {
  @Input() chef:any;

  constructor() { }

  ngOnInit(): void {
  }

}
