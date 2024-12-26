import { TestBed } from '@angular/core/testing';

import { I18nProAngularService } from './i18n-pro-angular.service';

describe('I18nProAngularService', () => {
  let service: I18nProAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nProAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
