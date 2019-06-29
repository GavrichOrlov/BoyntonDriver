import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewvehiclePage } from './addnewvehicle.page';

describe('AddnewvehiclePage', () => {
  let component: AddnewvehiclePage;
  let fixture: ComponentFixture<AddnewvehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewvehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewvehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
