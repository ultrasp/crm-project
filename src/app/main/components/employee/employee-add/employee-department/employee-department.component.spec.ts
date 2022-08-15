import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDepartmentComponent } from './employee-department.component';

describe('EmployeeDepartmentComponent', () => {
  let component: EmployeeDepartmentComponent;
  let fixture: ComponentFixture<EmployeeDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
