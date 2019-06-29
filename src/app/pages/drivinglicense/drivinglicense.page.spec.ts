import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivinglicensePage } from './drivinglicense.page';

describe('DrivinglicensePage', () => {
  let component: DrivinglicensePage;
  let fixture: ComponentFixture<DrivinglicensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivinglicensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivinglicensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
