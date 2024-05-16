import { TestBed } from '@angular/core/testing';
import { BoosterService } from './boster.service';

describe('boosterService', () => {
  let service: BoosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoosterService);
  });

  it('Deveria criar serviço de booster', () => {
    expect(service).toBeTruthy();
  });
});
