import { Component, OnInit } from '@angular/core';
import { ApexChart } from 'ng-apexcharts';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-growth',
  templateUrl: './users-growth.component.html',
  styleUrls: ['./users-growth.component.css']
})
export class UsersGrowthComponent implements OnInit {
  users: any[] = [];

  lineChart = {
    series: [{ name: 'Sales', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] }
  };
  chart: ApexChart = { type: 'line', height: 350 };

  constructor(private userService: UserService) { }

ngOnInit(): void {
  this.userService.getAllUsers().subscribe(
    (data: any) => {
      this.users = data;

      // 1. Initialiser un tableau pour les 12 mois
      const monthlyCounts = new Array(12).fill(0);

      // 2. Boucler sur les utilisateurs pour incrémenter le bon mois
      data.forEach((user:any) => {
        const date = new Date(user.createdAt);
        const month = date.getMonth(); // 0 = Janvier, 11 = Décembre
        monthlyCounts[month]++;
      });

      // 3. Mettre à jour la série du graphique
      this.lineChart = {
        series: [{ name: 'Users', data: monthlyCounts }],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      };
    },
    (error: any) => {
      console.error('Error fetching users:', error);
    }
  );
}


}
