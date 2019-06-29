import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmanagementPage } from './documentmanagement.page';

describe('DocumentmanagementPage', () => {
  let component: DocumentmanagementPage;
  let fixture: ComponentFixture<DocumentmanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentmanagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentmanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
