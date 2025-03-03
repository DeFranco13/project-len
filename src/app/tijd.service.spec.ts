import { TestBed } from '@angular/core/testing';

import { TijdService } from './tijd.service';

describe('TijdService', () => {
  let service: TijdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TijdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
