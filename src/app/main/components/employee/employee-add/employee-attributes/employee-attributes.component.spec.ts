import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttributesComponent } from './employee-attributes.component';

describe('EmployeeAttributesComponent', () => {
  let component: EmployeeAttributesComponent;
  let fixture: ComponentFixture<EmployeeAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
