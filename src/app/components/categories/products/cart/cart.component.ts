import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

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
  ) { }

  ngOnInit(): void {
  }

  closeCart = () => {
    this.dialogRef.close();
  };

}
