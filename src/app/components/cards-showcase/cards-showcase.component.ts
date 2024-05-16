import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ICardsFormated,
  ICardsOriginal,
  ICardsSet,
} from '../../interfaces/cards.model';
import { Subject, takeUntil } from 'rxjs';
import { BoosterService } from 'src/app/services/booster-service/boster.service';

@Component({
  selector: 'app-cards-showcase',
  templateUrl: './cards-showcase.component.html',
  styleUrls: ['./cards-showcase.component.scss'],
})
export class CardsShowcaseComponent implements OnInit, OnDestroy {
  constructor(private readonly boosterService: BoosterService) {}

  public cardsList: ICardsOriginal[] = [];
  public formatedCardsList: ICardsFormated[] = [];
  public formatedCardsPagedList: ICardsFormated[] = [];
  private readonly destroy$ = new Subject();
  private lastBoosterId: string = '';
  public loading = true;
  public selectedCards: ICardsOriginal[] = [];
  public showNotification = false;
  public notificationMessage = '';
  private currentPage = 0;
  public itemsPerPage = 4;

  closeNotification(): void {
    this.showNotification = false;
  }

  ngOnInit(): void {
    const storedValue = localStorage.getItem('lastBoosterId');
    if (storedValue) {
      this.lastBoosterId = JSON.parse(storedValue);
    }
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

  public getMoreCards(): void {
    if (this.lastBoosterId) {
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
            this.showNotification = true;
            this.notificationMessage = 'Erro ao abrir booster!';
          },
        });
    } else {
      this.loading = false;
    }
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
    this.unselectAllCards();
    this.formatManaCost();
    this.formatColorIdentity();
    this.handleUpdatePagination(1);
    this.loading = false;
  }

  private unselectAllCards(): void {
    this.cardsList = this.cardsList.map((card) => ({
      ...card,
      isSelected: false,
    }));
  }

  private formatManaCost(): void {
    this.formatedCardsList = this.cardsList.map((card, index) => ({
      ...card,
      manaCost: this.splitManaCost(card.manaCost),
      page: Math.ceil((index + 1) / this.itemsPerPage),
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

  public selectCard(id: string, card: ICardsFormated): void {
    const repeatedIndex = this.selectedCards.findIndex(
      (selectedCard) => selectedCard.id === id
    );

    const selectedIndex = this.formatedCardsList.findIndex(
      (selectedCard) => selectedCard.id === id
    );

    const selectedPagedIndex = this.formatedCardsPagedList.findIndex(
      (selectedCard) => selectedCard.id === id
    );

    if (repeatedIndex === -1) {
      if (this.selectedCards.length < 5) {
        this.formatedCardsPagedList[selectedPagedIndex].isSelected = true;
        this.cardsList[selectedIndex].isSelected = true;
        this.selectedCards.push(this.cardsList[selectedIndex]);
      } else {
        this.showNotification = true;
        this.notificationMessage = 'Você só pode selecionar até 5 cartas!';
      }
    } else {
      this.selectedCards.splice(repeatedIndex, 1);
      this.formatedCardsPagedList[selectedPagedIndex].isSelected = false;
      this.cardsList[selectedIndex].isSelected = false;
    }

    this.handleUpdatePagination(this.currentPage);
  }

  public rerollCards(): void {
    this.loading = true;
    this.cardsList = this.cardsList.filter((card) => !card.isSelected);

    this.getMoreCards();
  }

  public handleUpdatePagination(pageChanged: number): void {
    this.currentPage = pageChanged;
    this.formatedCardsPagedList = this.formatedCardsList.filter(
      ({ page }) => page === pageChanged
    );
  }
}
