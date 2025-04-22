// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import { AuthService } from 'src/app/demo/service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private userService: AuthService) {}
  tables: any[] = [];
  ngOnInit() {
    this.getPendingUsers();

  }

  getPendingUsers() {
    this.userService.getPendingUsers().subscribe((res) => {
      this.tables = res;
    });
  }

  approveUser(id: number) {
    this.userService.approveUser(id).subscribe(() => {
      this.tables = this.tables.filter(u => u.id !== id); // retirer du tableau
    });
  }

  rejectUser(id: number) {
    this.userService.rejectUser(id).subscribe(() => {
      this.tables = this.tables.filter(u => u.id !== id);
      this.getPendingUsers();
    });
  }
  // public method
  sales = [
    {
      title: 'Daily Sales',
      icon: 'icon-arrow-up text-c-green',
      amount: '$249.95',
      percentage: '67%',
      progress: 50,
      design: 'col-md-6',
      progress_bg: 'progress-c-theme'
    },
    {
      title: 'Monthly Sales',
      icon: 'icon-arrow-down text-c-red',
      amount: '$2,942.32',
      percentage: '36%',
      progress: 35,
      design: 'col-md-6',
      progress_bg: 'progress-c-theme2'
    },
    
  ];

  card = [
    {
      design: 'border-bottom',
      number: '235',
      text: 'TOTAL IDEAS',
      icon: 'icon-zap text-c-green'
    },
    {
      number: '26',
      text: 'TOTAL LOCATIONS',
      icon: 'icon-map-pin text-c-blue'
    }
  ];

  social_card = [
    {
      design: 'col-md-12',
      icon: 'fab fa-facebook-f text-primary',
      amount: '12,281',
      percentage: '+7.2%',
      color: 'text-c-green',
      target: '35,098',
      progress: 60,
      duration: '3,539',
      progress2: 45,
      progress_bg: 'progress-c-theme',
      progress_bg_2: 'progress-c-theme2'
    },
  
  ];

  progressing = [
    {
      number: '3',
      amount: '24',
      progress: 25,
      progress_bg: 'progress-c-theme'
    },
    {
      number: '2',
      amount: '1',
      progress: 10,
      progress_bg: 'progress-c-theme'
    },
    {
      number: '1',
      amount: '0',
      progress: 0,
      progress_bg: 'progress-c-theme'
    }
  ];

  
}
