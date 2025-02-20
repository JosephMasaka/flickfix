import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTvSeriesComponent } from './latest-tv-series.component';

describe('LatestTvSeriesComponent', () => {
  let component: LatestTvSeriesComponent;
  let fixture: ComponentFixture<LatestTvSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestTvSeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestTvSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
