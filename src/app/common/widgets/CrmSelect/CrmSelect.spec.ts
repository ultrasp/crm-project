/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrmSelect } from './CrmSelect';

describe('CrmSelectComponent', () => {
  let component: CrmSelect;
  let fixture: ComponentFixture<CrmSelect>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmSelect ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
