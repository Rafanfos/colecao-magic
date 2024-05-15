import { Component, OnInit } from '@angular/core';
import { BoosterService } from '../../services/boster.service';

@Component({
  selector: 'app-cards-showcase',
  templateUrl: './cards-showcase.component.html',
  styleUrl: './cards-showcase.component.scss',
})
export class CardsShowcaseComponent implements OnInit {
  constructor(private readonly boosterService: BoosterService) {}

  public cardsList: ICards[] = [];

  ngOnInit(): void {
    this.getCardsList();
  }

  private getCardsList(): void {
    this.boosterService.getCardsSubject().subscribe((cards: ICards[]) => {
      if (cards && cards.length > 0) {
        this.cardsList = cards;
        localStorage.setItem('lastCards', JSON.stringify(this.cardsList));
      } else {
        this.cardsList = JSON.parse(localStorage.getItem('lastCards') || '[]');
      }
    });
  }
}
