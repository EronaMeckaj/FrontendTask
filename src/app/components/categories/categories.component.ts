import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriesModel } from 'src/app/models/categories.model';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { DataService } from 'src/app/services/data.service';
import { CartComponent } from './products/cart/cart.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('searchbar')
  searchbar!: ElementRef;
  searchText = '';
  categories: CategoriesModel[] = [];
  constructor(public dataService: DataService, public filter: FilterPipe, private router: Router, private dialogManager: MatDialog,) {
  }

  ngOnInit() {
    this.getCategories();
  }

  /*
 Get all the data from the endpoint in order to build each category object and the categories array.
 */
  getCategories(): void {
    this.dataService.getAllData().subscribe({
      next: (res) => {
        res.categories.forEach(category => {
          this.categories.push(
            {
              id: category.id,
              categoryName: category.name,
              productsNumber: category.products.length
            }
          )
        });
      },
      error(err) {
        console.log(err);
      }
    });
  }

  goToProducts(id: number) {
    this.dataService.productsList = [];
    this.router.navigate(['categories', id]);
  }

  openCartModal = () => { //open cart popup to see the receipt
    this.dialogManager.open(CartComponent, {
      disableClose: true,
      data: {
        totalPrice: this.dataService.totalPrice,
        totalQuantity: this.dataService.totalQuantity,
        chosenProducts: this.dataService.chosenProducts
      },
    })
  };
}
