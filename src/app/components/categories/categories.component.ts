import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesModel } from 'src/app/models/categories.model';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { DataService } from 'src/app/services/data.service';

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
  constructor(private dataService: DataService, public filter: FilterPipe, private router: Router,) {
  }

  ngOnInit() {
    this.getCategories();
  }

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
    this.router.navigate(['categories', id]);
  }
}
