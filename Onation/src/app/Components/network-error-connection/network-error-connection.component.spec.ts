import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkErrorConnectionComponent } from './network-error-connection.component';

describe('NetworkErrorConnectionComponent', () => {
  let component: NetworkErrorConnectionComponent;
  let fixture: ComponentFixture<NetworkErrorConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkErrorConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkErrorConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
