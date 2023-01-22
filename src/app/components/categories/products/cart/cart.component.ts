import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import { ReceiptDialogComponent } from './receipt-dialog/receipt-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      totalPrice: number;
      totalQuantity: number;
      chosenProducts: Product[]
    },
    public dataService: DataService,
    private dialogManager: MatDialog
  ) { }

  ngOnInit(): void {
  }

  closeCart = () => {
    this.dialogRef.close();
  };

  openReceiptDialogModal = () => {
    this.closeCart();
    this.dialogManager.open(ReceiptDialogComponent, {
      disableClose: true,
    })
  };
}
