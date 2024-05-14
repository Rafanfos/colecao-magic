import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostersShowcaseComponent } from './boosters-showcase.component';

describe('BoostersShowcaseComponent', () => {
  let component: BoostersShowcaseComponent;
  let fixture: ComponentFixture<BoostersShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoostersShowcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoostersShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
