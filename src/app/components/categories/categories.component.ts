import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor(private dataService: DataService, public filter: FilterPipe) {
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
              categoryName: category.name,
              path: '/category/' + this.dataService.modifyString(category.name),
              productNumber: category.products.length
            }
          )
        });
      },
      error(err) {
        console.log(err);
      }
    });
  }
}
