import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private themeService: ThemeService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.checkCurrentPage()
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
}
