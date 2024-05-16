import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsShowcaseComponent } from './cards-showcase.component';

describe('CardsShowcaseComponent', () => {
  let component: CardsShowcaseComponent;
  let fixture: ComponentFixture<CardsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deveria criar mosrauário de cartas', () => {
    expect(component).toBeTruthy();
  });
});
