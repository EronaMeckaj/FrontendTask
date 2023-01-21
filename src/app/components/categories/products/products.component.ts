import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList!: Product[];
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
   * Displays the list of products on the grid, filtered from the json file by the category name received from the route param subscription.
   */
    filterProductsByCategoryId(id: string | null): void {
      this.dataService.getAllData().subscribe({
        next: (res) => {
          let filteredResults = res.categories.filter((category: Category) => {
            return category.id.toString()==id;
          })
          this.productsList = filteredResults[0].products;
          console.log(this.productsList,"this.products;i")
        }, error(err) {
          console.log(err);
        }
      })
    }
}
