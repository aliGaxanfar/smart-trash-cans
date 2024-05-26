import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunityBinDto } from '../models/community-bin-dto';

@Injectable({
  providedIn: 'root'
})
export class BinsService {

  private apiUrl = 'http://localhost:3000/store'

  constructor(private http: HttpClient) { }

  getBins(): Observable<CommunityBinDto[]> {
    return this.http.get<CommunityBinDto[]>(this.apiUrl);
  }
}
