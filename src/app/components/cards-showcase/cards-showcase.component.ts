import { Component, OnInit } from '@angular/core';
import { BoosterService } from '../../services/boster.service';
import { ICardsFommated, ICardsOriginal } from '../../interfaces/cards.model';

@Component({
  selector: 'app-cards-showcase',
  templateUrl: './cards-showcase.component.html',
  styleUrl: './cards-showcase.component.scss',
})
export class CardsShowcaseComponent implements OnInit {
  constructor(private readonly boosterService: BoosterService) {}

  public cardsList: ICardsOriginal[] = [];
  public fommatedCardsList: ICardsFommated[] = [];

  ngOnInit(): void {
    this.getCardsList();
  }

  private getCardsList(): void {
    this.boosterService
      .getCardsSubject()
      .subscribe((cards: ICardsOriginal[]) => {
        if (cards && cards.length > 0) {
          this.cardsList = cards;
          localStorage.setItem('lastCards', JSON.stringify(this.cardsList));
        } else {
          this.cardsList = JSON.parse(
            localStorage.getItem('lastCards') || '[]'
          );
        }

        this.fommatManaCost();
      });
  }

  private fommatManaCost(): void {
    this.fommatedCardsList = this.cardsList.map((card) => ({
      ...card,
      manaCost: this.splitManaCost(card.manaCost),
    }));

    this.formatColorIdentity();
  }

  private splitManaCost(manaCost: string): { qtd: string; mana: string[] } {
    let qtd = '';
    if (!isNaN(parseInt(manaCost[1]))) {
      qtd = manaCost.substring(0, 3);
    }

    const regex = /{[^}]+}/g;

    const mana = manaCost.substring(qtd ? 3 : 0).match(regex) as string[];

    return {
      qtd,
      mana,
    };
  }

  private formatColorIdentity(): void {
    this.fommatedCardsList = this.fommatedCardsList.map((card) => ({
      ...card,
      colorIdentity: this.convertColorIdentyToEnum(card.colorIdentity),
    }));

    console.log(this.fommatedCardsList);
  }

  private convertColorIdentyToEnum(colorIdentity: string[]): string[] {
    return colorIdentity.map((color) => `{${color[0]}}`);
  }
}
