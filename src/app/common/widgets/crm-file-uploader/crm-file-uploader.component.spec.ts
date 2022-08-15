import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmFileUploaderComponent } from './crm-file-uploader.component';

describe('CrmFileUploaderComponent', () => {
  let component: CrmFileUploaderComponent;
  let fixture: ComponentFixture<CrmFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmFileUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
