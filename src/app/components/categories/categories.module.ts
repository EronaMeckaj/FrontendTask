import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@NgModule({
  declarations: [
    CategoriesComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
  ],
  exports: [CategoriesComponent],
  providers: [FilterPipe]
})
export class CategoriesModule { }
