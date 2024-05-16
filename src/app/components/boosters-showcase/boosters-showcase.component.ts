import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoosterService } from '../../services/booster-service/boster.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IBoosters } from '../../interfaces/boosters.model';

@Component({
  selector: 'app-boosters-showcase',
  templateUrl: './boosters-showcase.component.html',
  styleUrls: ['./boosters-showcase.component.scss'],
})
export class BoostersShowcaseComponent implements OnInit, OnDestroy {
  constructor(
    private readonly boosterService: BoosterService,
    private router: Router
  ) {}

  public boostersList: IBoosters[] = [];
  private readonly destroy$ = new Subject();
  public showNotification = false;
  public notificationMessage = '';

  ngOnInit(): void {
    this.getBoostersList();
    localStorage.removeItem('lastCards');
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private getBoostersList(): void {
    this.boosterService
      .getBoostersSubject()
      .pipe(takeUntil(this.destroy$))
      .subscribe((boosters: IBoosters[]) => {
        if (boosters && boosters.length > 0) {
          this.boostersList = boosters;
          localStorage.setItem(
            'lastBoosters',
            JSON.stringify(this.boostersList)
          );
        } else {
          this.boostersList = JSON.parse(
            localStorage.getItem('lastBoosters') || '[]'
          );
        }

        this.formmatDate();
      });
  }

  public backToBoosterSearch(): void {
    this.router.navigate(['/booster-search']);
  }

  private formmatDate(): void {
    this.boostersList.forEach((booster) => {
      const parts = booster.releaseDate.split('-');
      const formattedDate = parts.reverse().join('/');
      booster.releaseDate = formattedDate;
    });
  }

  public openBoosters(boosterId: string): void {
    localStorage.setItem('lastBoosterId', JSON.stringify(boosterId));

    this.boosterService
      .getCards(boosterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const creaturesCards = response.cards.filter(({ types }) =>
            types.includes('Creature')
          );
          this.boosterService.setCardsSubject(creaturesCards);
          this.openCardsShowCase();
        },
        error: () => {
          this.showNotification = true;
          this.notificationMessage = 'Erro ao abrir boosters!';
        },
      });
  }

  private openCardsShowCase(): void {
    this.router.navigate(['/cards-showcase']);
  }
}
