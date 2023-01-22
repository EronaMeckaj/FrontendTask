import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { ToolbarModule } from 'src/shared/components/toolbar/toolbar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ToolbarModule,
    MatDialogModule,
    MatBadgeModule,
    MatCheckboxModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
