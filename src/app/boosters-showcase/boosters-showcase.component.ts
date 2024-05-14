import { Component, OnInit } from '@angular/core';
import { BoosterService } from '../services/boster.service';
import { Router } from '@angular/router';

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

  public boostersList: any[] = [];

  ngOnInit(): void {
    this.getBoostersList();
  }

  private getBoostersList(): void {
    this.boosterService.getBoostersSubject().subscribe((boosters: any[]) => {
      // Se houver boosters, atualize a lista e salve no armazenamento local
      if (boosters && boosters.length > 0) {
        this.boostersList = boosters;
        localStorage.setItem('lastBoosters', JSON.stringify(this.boostersList));
      } else {
        this.boostersList = JSON.parse(
          localStorage.getItem('lastBoosters') || '[]'
        );
      }
    });
  }

  public backToBoosterSearch(): void {
    this.router.navigate(['/booster-search']);
  }
}
