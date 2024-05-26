import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinsService } from '../services/bins.service';
import { CommunityBinDto } from '../models/community-bin-dto';

declare const Microsoft: any;

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BingMapComponent implements OnInit {
  map: any;
  locations: any[] = [];

  constructor(private binService: BinsService) {}

  ngOnInit(): void {
    this.binService.getBins().subscribe((data: CommunityBinDto[]) => {
      this.locations = data.map(bin => ({
        latitude:  parseFloat(bin.location.split(',')[0]),
        longitude: parseFloat(bin.location.split(',')[1]),
        status: bin.status
      }));
      this.initializeMap();
    });
  }

  initializeMap(): void {
    this.map = new Microsoft.Maps.Map('#bing-map', {
      credentials: 'As1-i8hcTgK4Slaoq7UT_lZmkW4yvr_ECsTdniFopz8ucqiZYP4XveQV0fg1KfmM',
      center: new Microsoft.Maps.Location(this.locations[0].latitude, this.locations[0].longitude),
      zoom: 12
    });
  
    this.locations.forEach(location => {
      const pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(location.latitude, location.longitude));
      this.map.entities.push(pin);
    });
  }

}