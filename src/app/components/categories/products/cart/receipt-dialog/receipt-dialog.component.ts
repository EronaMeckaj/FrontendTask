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
    private router: Router,
    public dataService: DataService
  ) { }

  closeReceiptDialogModal = () => {
    this.dataService.chosenProducts = [];
    this.dataService.productsList = [];
    this.dataService.totalQuantity = 0;
    this.dataService.totalPrice = 0;
    this.dialogRef.close();
    this.router.navigate(['categories']);
  };
}
