import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmethodPage } from './paymentmethod.page';

describe('PaymentmethodPage', () => {
  let component: PaymentmethodPage;
  let fixture: ComponentFixture<PaymentmethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentmethodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentmethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
