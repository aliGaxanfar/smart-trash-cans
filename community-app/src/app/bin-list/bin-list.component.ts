import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BinsService } from '../services/bins.service';
import { CommunityBinDto } from '../models/community-bin-dto';

@Component({
  selector: 'app-bin-list',
  templateUrl: './bin-list.component.html',
  styleUrls: ['./bin-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule]
})
export class BinListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'status', 'location'];
  dataSource: CommunityBinDto[] = [];

  constructor(private binService: BinsService) {}

  ngOnInit(): void {
    this.binService.getBins().subscribe((data: CommunityBinDto[]) => {
      this.dataSource = data;
    });
  }
}
