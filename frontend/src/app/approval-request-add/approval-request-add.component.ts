import { Component, OnInit } from '@angular/core';
import { ApprovalRequestService } from '../approval-request.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApprovalRequest } from '../Models/approval-request-model';

@Component({
  selector: 'app-approval-request-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './approval-request-add.component.html',
  styleUrl: './approval-request-add.component.css'
})
export class ApprovalRequestAddComponent implements OnInit {
  approvalRequestForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private approvalRequestService: ApprovalRequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.approvalRequestForm = this.fb.group({
      Approver: ['', Validators.required],
      LeaveRequest: ['', Validators.required],
      Status: ['', Validators.required],
      Comment: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.approvalRequestService.getApprovalRequest(this.id).subscribe((data) => {
        this.approvalRequestForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.approvalRequestForm.valid) {
      if (this.id) {
        this.approvalRequestService.updateApprovalRequest(this.id, this.approvalRequestForm.value).subscribe(() => {
          this.router.navigate(['/Lists/ApprovalRequests']);
        });
      } else {
        this.approvalRequestService.addApprovalRequest(this.approvalRequestForm.value).subscribe(() => {
          this.router.navigate(['/Lists/ApprovalRequests']);
        });
      }
    }
  }
}
