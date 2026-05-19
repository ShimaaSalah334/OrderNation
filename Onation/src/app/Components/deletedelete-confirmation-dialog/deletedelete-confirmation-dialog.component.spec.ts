import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedeleteConfirmationDialogComponent } from './deletedelete-confirmation-dialog.component';

describe('DeletedeleteConfirmationDialogComponent', () => {
  let component: DeletedeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeletedeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedeleteConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
