import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoosterService } from '../services/boster.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booster-search',
  templateUrl: './booster-search.component.html',
  styleUrl: './booster-search.component.scss',
})
export class BoosterSearchComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private readonly boosterService: BoosterService,
    private router: Router
  ) {}

  public boosterOptions = [
    'Amonkhet',
    'Ixalan',
    'Zendikar',
    'Ravnica',
    'Onslaught',
  ];
  public boosterSearchForm!: FormGroup;
  private readonly destroy$ = new Subject();

  ngOnInit(): void {
    this.buildBoosterSearchForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private buildBoosterSearchForm(): void {
    this.boosterSearchForm = this.formBuilder.group({
      name: [''],
      block: ['', Validators.required],
    });
  }

  public submitSearchData() {
    const { name, block } = this.boosterSearchForm.controls;
    const queryName = name.value;
    const queryBlock = block.value;

    this.boosterService
      .searchBoosters(queryName, queryBlock)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.boosterService.setBoostersSubject(response.sets);
          this.openBoostersShowCase();
        },
        error: () => {
          console.log('Erro ao carregar boosters!');
        },
      });
  }

  private openBoostersShowCase(): void {
    this.router.navigate(['/boosters-showcase']);
  }
}
