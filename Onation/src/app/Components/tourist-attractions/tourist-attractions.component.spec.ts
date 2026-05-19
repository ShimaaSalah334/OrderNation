import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristAttractionsComponent } from './tourist-attractions.component';

describe('TouristAttractionsComponent', () => {
  let component: TouristAttractionsComponent;
  let fixture: ComponentFixture<TouristAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TouristAttractionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TouristAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
