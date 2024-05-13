import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-booster-search',
  templateUrl: './booster-search.component.html',
  styleUrl: './booster-search.component.scss',
})
export class BoosterSearchComponent {
  public boosterOptions = [
    'Amonkhet',
    'Ixalan',
    'Zendikar',
    'Ravnica',
    'Onslaught',
  ];

  aberta: boolean = false;

  toggleAberta() {
    this.aberta = !this.aberta;
  }
}
