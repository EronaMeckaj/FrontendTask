import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categoryId!: string | null;
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private dialogManager: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get("id");
      this.dataService.filterProductsByCategoryId(this.categoryId);
    })
  }

  openCartModal = () => {
    this.dialogManager.open(CartComponent, {
      disableClose: true,
      data: {
        totalPrice: this.dataService.totalPrice,
        totalQuantity: this.dataService.totalQuantity,
        chosenProducts: this.dataService.chosenProducts
      },
    })
  };

  addToCart(selectedProduct: Product): void {
    const index = this.dataService.chosenProducts.findIndex((product) => product.name === selectedProduct.name);
    const indexNewProductList = this.dataService.newProductList.findIndex((product) => product.name === selectedProduct.name);
    if (index > -1) { //check if product exists in the list
      this.dataService.newProductList[indexNewProductList].showButton = true;
      this.dataService.chosenProducts[index] = {
        name: this.dataService.chosenProducts[index].name,
        unitPrice: this.dataService.chosenProducts[index].unitPrice += selectedProduct.unitPrice,
        quantity: this.dataService.chosenProducts[index].quantity += 1,
        backgroundColor: this.dataService.getRandomColor(), // sets the background color for each icon
        showButton: true,
        itemPrice: selectedProduct.itemPrice
      }
      this.dataService.newProductList[indexNewProductList].quantity = this.dataService.chosenProducts[index].quantity;;

    } else { //if product doesn't exist in the list, we add it to this list
      this.dataService.newProductList[indexNewProductList].showButton = true;
      this.dataService.newProductList[indexNewProductList].quantity = 1;
      this.dataService.chosenProducts.push({
        name: selectedProduct.name,
        unitPrice: selectedProduct.unitPrice,
        quantity: 1,
        backgroundColor: this.dataService.getRandomColor(), // sets the background color for each icon
        showButton: true,
        itemPrice: selectedProduct.itemPrice
      })
    }
    this.getTotalPrice(this.dataService.chosenProducts);
    this.getTotalQuantity(this.dataService.chosenProducts);
  }

  removeFromCart(selectedProduct: Product): void {
    const index = this.dataService.chosenProducts.findIndex((product) => product.name === selectedProduct.name);
    const indexNewProductList = this.dataService.newProductList.findIndex((product) => product.name === selectedProduct.name);
    if (index > -1) { //check if product exists in the list
      if (this.dataService.chosenProducts[index].quantity > 0) {
        this.dataService.newProductList[indexNewProductList].showButton = true;
        this.dataService.chosenProducts[index] = {
          name: this.dataService.chosenProducts[index].name,
          unitPrice: this.dataService.chosenProducts[index].unitPrice -= selectedProduct.unitPrice,
          quantity: this.dataService.chosenProducts[index].quantity -= 1,
          backgroundColor: this.dataService.getRandomColor(), // sets the background color for each icon
          showButton: true,
          itemPrice: selectedProduct.itemPrice
        }
        this.dataService.newProductList[indexNewProductList].quantity = this.dataService.chosenProducts[index].quantity;
      }
    }
    if (this.dataService.chosenProducts[index].quantity == 0) { //check if there is a product on the cart
      this.dataService.newProductList[indexNewProductList].quantity = this.dataService.chosenProducts[index].quantity;
      this.dataService.newProductList[indexNewProductList].showButton = false;
    }
    this.getTotalPrice(this.dataService.chosenProducts);
    this.getTotalQuantity(this.dataService.chosenProducts);
  }

  getTotalPrice(chosenProducts: Product[]): number {
    this.dataService.totalPrice = 0;
    chosenProducts.forEach(product => {
      this.dataService.totalPrice += product.unitPrice;
    });
    return this.dataService.totalPrice;
  }

  getTotalQuantity(chosenProducts: Product[]): number {
    this.dataService.totalQuantity = 0;
    chosenProducts.forEach(product => {
      this.dataService.totalQuantity += product.quantity;
    });
    return this.dataService.totalQuantity;
  }
}
