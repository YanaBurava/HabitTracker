import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  @Output() themeToggle = new EventEmitter<boolean>();

  toggleTheme(value: boolean) {
    this.themeToggle.emit(value);
  }
}
