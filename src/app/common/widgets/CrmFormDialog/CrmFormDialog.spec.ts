/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrmFormDialog } from './CrmFormDialog';

describe('CrmFormDialogComponent', () => {
  let component: CrmFormDialog;
  let fixture: ComponentFixture<CrmFormDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmFormDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
