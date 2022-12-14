/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlertDialog } from './AlertDialog';

describe('AlertDialogComponent', () => {
  let component: AlertDialog;
  let fixture: ComponentFixture<AlertDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
