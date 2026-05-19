import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletedelete-confirmation-dialog',
  templateUrl: './deletedelete-confirmation-dialog.component.html',
  styleUrl: './deletedelete-confirmation-dialog.component.css'
})
export class DeletedeleteConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeletedeleteConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
