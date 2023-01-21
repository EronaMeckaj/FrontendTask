import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { Category, Product } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList: Product[] | undefined;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let categoryId = params.get("id");
      this.filterProductsByCategoryId(categoryId);
    })
  }

  /**
 * Gets the list of products for the chosen category, filtering the data from the endpoint with the id received from the route params.
 */
  filterProductsByCategoryId(id: string | null): void {
    this.dataService.getAllData().subscribe({
      next: (res) => {
        let filteredResults = res.categories.find((category: Category) => {
          return category.id.toString() == id;
        })
        this.productsList = filteredResults?.products.map((product) => {
          return {
            categoryName: product.name,
            name: product.name,
            unitPrice: product.unitPrice,
            backgroundColor: this.getRandomColor() // sets the background color for each icon
          }
        })
      }, error(err) {
        console.log(err);
      }
    })
  }

  /**
  * Generates random colors for each product icon.
  */
  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
* Checks if the product name starts with a letter or not.
* If it starts with a letter, it returns the first letter of the product name.
* If it doesn't start with a letter, it replaces special characters and numbers in the product name and then takes the first letter of the product name.
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
}
