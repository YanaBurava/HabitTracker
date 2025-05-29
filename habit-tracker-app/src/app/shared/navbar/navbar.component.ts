import { Component, Output, EventEmitter } from '@angular/core';
import { AppRoutes } from '../../constants/routes.enum';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
   routes = AppRoutes;
  @Output() themeToggle = new EventEmitter<boolean>();

  toggleTheme(value: boolean) {
    this.themeToggle.emit(value);
  }
}
