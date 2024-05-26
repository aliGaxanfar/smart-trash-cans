import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BinsService } from '../services/bins.service';
import { CommunityBinDto } from '../models/community-bin-dto';

@Component({
  selector: 'app-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.css'],
  standalone: true,
  imports: [CommonModule, NgChartsModule]
})
export class StatusChartComponent implements OnInit {
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Filled', 'Empty'],
    datasets: [
      {
        data: [0, 0] // Initial values
      }
    ]
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public pieChartType: ChartType = 'pie';

  constructor(private binService: BinsService) {}

  ngOnInit(): void {
    this.binService.getBins().subscribe((data: CommunityBinDto[]) => {
      const filledCount = data.filter(bin => bin.status === 'filled').length;
      const emptyCount = data.filter(bin => bin.status === 'empty').length;
  
      console.log('Filled Count:', filledCount);
      console.log('Empty Count:', emptyCount);
  
      this.pieChartData.datasets[0].data = [filledCount, emptyCount];
    });
  }
  
}
