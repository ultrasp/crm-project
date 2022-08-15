/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrmButton } from './CrmButton';

describe('CrmButtonComponent', () => {
  let component: CrmButton;
  let fixture: ComponentFixture<CrmButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
