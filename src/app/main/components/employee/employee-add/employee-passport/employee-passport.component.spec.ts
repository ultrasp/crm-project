import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePassportComponent } from './employee-passport.component';

describe('EmployeePassportComponent', () => {
  let component: EmployeePassportComponent;
  let fixture: ComponentFixture<EmployeePassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePassportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
