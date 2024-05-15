import { Component, OnInit } from '@angular/core';
import { BoosterService } from '../../services/boster.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IBoosters } from '../../interfaces/boosters.model';

@Component({
  selector: 'app-boosters-showcase',
  templateUrl: './boosters-showcase.component.html',
  styleUrls: ['./boosters-showcase.component.scss'],
})
export class BoostersShowcaseComponent implements OnInit {
  constructor(
    private readonly boosterService: BoosterService,
    private router: Router
  ) {}

  public boostersList: IBoosters[] = [];
  private readonly destroy$ = new Subject();

  ngOnInit(): void {
    this.getBoostersList();
  }

  private getBoostersList(): void {
    this.boosterService
      .getBoostersSubject()
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

  public openBoosters(boosterId: string) {
    this.boosterService
      .getCards(boosterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.boosterService.setBoostersSubject(response.sets);
          this.openCardsShowCase();
        },
        error: () => {
          console.log('Erro ao abrir booster!');
        },
      });
  }

  private openCardsShowCase(): void {
    this.router.navigate(['/cards-showcase']);
  }
}
