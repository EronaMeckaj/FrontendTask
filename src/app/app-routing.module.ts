import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
    path: "categories",
    loadChildren: () => import('src/app/components/categories/categories.module').then((m) => m.CategoriesModule)
  },
  {
    path: "categories/:id",
    loadChildren: () => import('src/app/components/categories/products/products.module').then((m) => m.ProductsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
