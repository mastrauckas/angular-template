import { async, inject, TestBed } from '@angular/core/testing';
import EnvironmentService from './environmentService';
import { environmentName } from '../globals';

describe('EnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService]
    });
  });

  it('isDevelopment property should be the same as environmentName',
    async(inject([EnvironmentService], (service) => {
      expect(service.isDevelopment).toEqual(isDevelopment());
    }))
  );

  it('isProduction property should be the same as environmentName',
    async(inject([EnvironmentService], (service) => {
      expect(service.isProduction).toEqual(isProduction());
    }))
  );

  function isDevelopment(): boolean {
    return environmentName === 'DEVELOPMENT';
  }

  function isProduction(): boolean {
    return environmentName === 'PRODUCTION';
  }
});

