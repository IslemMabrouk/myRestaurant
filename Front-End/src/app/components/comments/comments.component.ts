import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  rating: number = 4.5;

  constructor() { }

  ngOnInit(): void {
  }

  get stars(): string[] {
  const starsArray = [];
  let rating = this.rating;
  
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      starsArray.push('full');
    } else if (rating >= 0.5) {
      starsArray.push('half');
    } else {
      starsArray.push('empty');
    }
    rating -= 1;
  }
  return starsArray;
}

}
