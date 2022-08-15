/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmpEducationForm } from './EmpEducationForm';

describe('EmpEducationComponent', () => {
  let component: EmpEducationForm;
  let fixture: ComponentFixture<EmpEducationForm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpEducationForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpEducationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
