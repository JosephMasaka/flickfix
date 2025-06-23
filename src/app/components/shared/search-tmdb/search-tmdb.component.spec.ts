import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTMDBComponent } from './search-tmdb.component';

describe('SearchTMDBComponent', () => {
  let component: SearchTMDBComponent;
  let fixture: ComponentFixture<SearchTMDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTMDBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTMDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
