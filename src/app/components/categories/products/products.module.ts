import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
