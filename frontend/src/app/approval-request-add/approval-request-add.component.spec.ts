import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequestAddComponent } from './approval-request-add.component';

describe('ApprovalRequestAddComponent', () => {
  let component: ApprovalRequestAddComponent;
  let fixture: ComponentFixture<ApprovalRequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalRequestAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
