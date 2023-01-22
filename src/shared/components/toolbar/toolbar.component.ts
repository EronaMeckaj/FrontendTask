import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartComponent } from 'src/app/components/categories/products/cart/cart.component';
import { DataService } from 'src/app/services/data.service';
import { ThemeService } from 'src/app/themes/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  darkModeSwitcher = true;
  currentUrl!: string;
  showIcons: boolean = false;
  businessName = "";
  constructor(
    private themeService: ThemeService,
    private router: Router,
    public dataService: DataService,
    private dialogManager: MatDialog,
  ) { }
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.checkCurrentPage();
    this.getBusinessName();
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.darkModeSwitcher = true;
    } else {
      this.darkModeSwitcher = false;
    }
  }
  toggleThemes() {
    this.darkModeSwitcher = !this.darkModeSwitcher;
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
  goBackToCategories() {
    this.router.navigate(['categories']);
  }

  checkCurrentPage() {
    if (this.currentUrl == "/categories") {
      this.showIcons = true;
    } else {
      this.showIcons = false;
    }
  }

  openCartModal = () => {
    this.dialogManager.open(CartComponent, {
      disableClose: true,
      data: {
        totalPrice: this.dataService.totalPrice,
        totalQuantity: this.dataService.totalQuantity,
        chosenProducts: this.dataService.chosenProducts
      },
    })
  };

  getBusinessName(): void {
    this.dataService.getAllData().subscribe({
      next: (res) => {
        this.businessName = res.businessName;
      },
      error(err) {
        console.log(err);
      }
    });
  }
}
