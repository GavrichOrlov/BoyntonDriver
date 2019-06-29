import { TestBed } from '@angular/core/testing';

import { IondriverServicesService } from './iondriver-services.service';

describe('IondriverServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IondriverServicesService = TestBed.get(IondriverServicesService);
    expect(service).toBeTruthy();
  });
});
