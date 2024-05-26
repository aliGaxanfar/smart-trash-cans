import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinListComponent } from './bin-list.component';

describe('BinListComponent', () => {
  let component: BinListComponent;
  let fixture: ComponentFixture<BinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
