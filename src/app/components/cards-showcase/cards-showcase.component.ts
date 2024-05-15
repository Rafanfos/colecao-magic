import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ICardsFormated,
  ICardsOriginal,
  ICardsSet,
} from '../../interfaces/cards.model';

import { Subject, takeUntil } from 'rxjs';
import { BoosterService } from 'src/app/services/boster.service';

@Component({
  selector: 'app-cards-showcase',
  templateUrl: './cards-showcase.component.html',
  styleUrls: ['./cards-showcase.component.scss'], // "styleUrls" em vez de "styleUrl"
})
export class CardsShowcaseComponent implements OnInit, OnDestroy {
  constructor(private readonly boosterService: BoosterService) {}

  public cardsList: ICardsOriginal[] = [];
  public formatedCardsList: ICardsFormated[] = [];
  private readonly destroy$ = new Subject();
  private lastBoosterId: string = '';
  public loading = true;

  ngOnInit(): void {
    this.lastBoosterId = JSON.parse(
      localStorage.getItem('lastBoosterId') || ''
    );
    this.getCardsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private getCardsList(): void {
    this.boosterService
      .getCardsSubject()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cards: ICardsOriginal[]) => {
        if (cards && cards.length > 0) {
          this.cardsList = [...this.cardsList, ...cards];
          localStorage.setItem('lastCards', JSON.stringify(this.cardsList));
        } else {
          this.cardsList = JSON.parse(
            localStorage.getItem('lastCards') || '[]'
          );
        }

        this.verifyDeckCondition();
      });
  }

  private getMoreCards(): void {
    this.boosterService
      .getCards(this.lastBoosterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ICardsSet) => {
          const creaturesCards = response.cards.filter(({ types }) =>
            types.includes('Creature')
          );
          this.cardsList = [...this.cardsList, ...creaturesCards];

          this.verifyDeckCondition();
        },
        error: () => {
          console.log('Erro ao abrir booster!');
        },
      });
  }

  private verifyDeckCondition(): void {
    if (this.cardsList.length < 30) {
      this.getMoreCards();
    } else {
      this.formatCards();
    }
  }

  private formatCards(): void {
    this.cardsList = this.cardsList.slice(0, 30);
    this.formatManaCost();
    this.formatColorIdentity();
    this.loading = false;
  }

  private formatManaCost(): void {
    this.formatedCardsList = this.cardsList.map((card) => ({
      ...card,
      manaCost: this.splitManaCost(card.manaCost),
    }));
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
    this.formatedCardsList = this.formatedCardsList.map((card) => ({
      ...card,
      colorIdentity:
        this.convertColorIdentityToEnum(card.colorIdentity) ||
        card.colorIdentity,
    }));
  }

  private convertColorIdentityToEnum(colorIdentity: string[]): string[] | void {
    if (colorIdentity) {
      return colorIdentity.map((color) => `{${color[0]}}`);
    }
  }
}
