import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitefriendsPage } from './invitefriends.page';

describe('InvitefriendsPage', () => {
  let component: InvitefriendsPage;
  let fixture: ComponentFixture<InvitefriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitefriendsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitefriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
