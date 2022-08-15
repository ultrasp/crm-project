import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarModelFormDialog } from './carModelFormDialog.component';

describe('UserFormDialogComponent', () => {
  let component: CarModelFormDialog;
  let fixture: ComponentFixture<CarModelFormDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarModelFormDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarModelFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
