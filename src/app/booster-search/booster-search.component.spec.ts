import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoosterSearchComponent } from './booster-search.component';

describe('BoosterSearchComponent', () => {
  let component: BoosterSearchComponent;
  let fixture: ComponentFixture<BoosterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoosterSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoosterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar buscador de boosters', () => {
    expect(component).toBeTruthy();
  });
});
