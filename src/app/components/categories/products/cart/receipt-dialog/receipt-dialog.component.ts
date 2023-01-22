import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.scss']
})
export class ReceiptDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReceiptDialogComponent>,
    public dataService: DataService,
    private router: Router,
  ) { }

  closeReceiptDialogModal = () => {
    this.dialogRef.close();
    this.dataService.chosenProducts = [];
    this.dataService.totalQuantity = 0;
    this.router.navigate(['categories']);
  };
}
