import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoosterSearchService } from '../services/boster-search.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-booster-search',
  templateUrl: './booster-search.component.html',
  styleUrl: './booster-search.component.scss',
})
export class BoosterSearchComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private readonly boosterSearchService: BoosterSearchService
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

    this.boosterSearchService
      .searchBoosters(queryName, queryBlock)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => console.log(response));
  }
}
