import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewmanagementPage } from './reviewmanagement.page';

describe('ReviewmanagementPage', () => {
  let component: ReviewmanagementPage;
  let fixture: ComponentFixture<ReviewmanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewmanagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewmanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
