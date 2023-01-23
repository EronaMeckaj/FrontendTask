import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Data, Product } from '../models/data.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  totalQuantity: number = 0;
  chosenProducts: Product[] = [];
  totalPrice: number = 0;
  productsList: Product[] = [];
  categoryName = "";
  showView = false;
  slidesNumber?: number;
  totalSlides: any;
  newProductList: Product[] = [];
  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver,) { }
  /*
   * GET request to take all data from the endpoint as an Observable of type Data.
   */
  getAllData(): Observable<Data> {
    return this.http.get<Data>('https://test.dev.al/test/');
  }

  /* Get the list of products for the chosen category, filtering the data from the endpoint with the id received from the route params.
*/
  filterProductsByCategoryId(id: string | null): void {
    this.getAllData().subscribe({
      next: (res) => {
        let filteredResults = res.categories.find((category: Category) => {
          return category.id.toString() == id;
        })
        this.categoryName = filteredResults!.name;
        this.productsList = filteredResults!.products.map((product) => {
          return {
            categoryName: product.name,
            name: product.name,
            unitPrice: product.unitPrice,
            backgroundColor: this.getRandomColor(), // sets the background color for each icon
            quantity: 0,
            showButton: false,
            itemPrice: product.unitPrice
          }
        })
        if (this.productsList.length > 0) {
          this.productsList.forEach(product => {
            this.chosenProducts.forEach(chosenProduct => {
              if (product.name == chosenProduct.name) {
                product.quantity = chosenProduct.quantity;
                if (chosenProduct.quantity > 0) {
                  product.showButton = true;
                }
              }
            });
          });
          this.activeSlideChange(0);
          if (this.newProductList.length > 0) {
            this.slidesNumber = Math.ceil(this.productsList.length / 6);
            this.totalSlides = Array.from({ length: this.slidesNumber }, (_, index) => index + 1);
            this.showView = true;
          } else {
            this.showView = false
          }
        } else {
          this.showView = false;
        }
      }, error(err) {
        console.log(err);
      }
    })
  }

  /*
   Generates random colors for each product icon.
  */
  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /*
Checks if the product name starts with a letter or not.
If it starts with a letter, it returns the first letter of the product name.
If it doesn't start with a letter, it replaces special characters and numbers in the product name and then takes the first letter of the product name.
*/
  checkLetter(name: string) {
    if (/^[a-z]/i.test(name)) {
      return name.charAt(0).toUpperCase();
    } else {
      name = name.replace(/[^a-zA-Z]/g, "");
      name = name.replace(/[0-9]/g, "");
      return name.charAt(0).toUpperCase();
    }
  }

  /*
Get the product list for each slide of the carousel. Each slide will have cards based on different breakpoints.
*/
  activeSlideChange(newIndex: number) {
    if (newIndex >= 0) {
      this.breakpointObserver.observe([
        "(max-width: 350px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          let begin = ((newIndex + 1 - 1) * 5);
          let end = begin + 5;
          this.newProductList = this.productsList.slice(begin, end);
        }
      });
      this.breakpointObserver.observe([
        "(max-width: 600px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          let begin = ((newIndex + 1 - 1) * 6);
          let end = begin + 6;
          this.newProductList = this.productsList.slice(begin, end);
        }
      });
      this.breakpointObserver.observe([
        "(min-width: 600px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          let begin = ((newIndex + 1 - 1) * 6);
          let end = begin + 6;
          this.newProductList = this.productsList.slice(begin, end);
        }
      });
      this.breakpointObserver.observe([
        "(min-width: 768px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          let begin = ((newIndex + 1 - 1) * 6);
          let end = begin + 6;
          this.newProductList = this.productsList.slice(begin, end);
        }
      });
      this.breakpointObserver.observe([
        "(min-width: 992px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          let begin = ((newIndex + 1 - 1) * 6);
          let end = begin + 6;
          this.newProductList = this.productsList.slice(begin, end);
        }
      });
      this.breakpointObserver.observe([
        "(min-width: 1200px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          let begin = ((newIndex + 1 - 1) * 6);
          let end = begin + 6;
          this.newProductList = this.productsList.slice(begin, end);
        }
      });
    }
  };
}

