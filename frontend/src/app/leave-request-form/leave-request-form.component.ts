import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveRequestsService } from '../leave-requests.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css'
})
export class LeaveRequestFormComponent implements OnInit{
  leaveRequestForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private leaveRequestService: LeaveRequestsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.leaveRequestForm = this.fb.group({
      Employee: ['', Validators.required],
      AbsenceReason: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Comment: [''],
      Status: [{value: 'New', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.leaveRequestService.getLeaveRequest(this.id).subscribe((data) => {
        this.leaveRequestForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.leaveRequestForm.valid) {
      if (this.id) {
        this.leaveRequestService.updateLeaveRequest(this.id, this.leaveRequestForm.value).subscribe(() => {
          this.router.navigate(['/Lists/LeaveRequests']);
        });
      } else {
        this.leaveRequestService.addLeaveRequest(this.leaveRequestForm.value).subscribe(() => {
          this.router.navigate(['/Lists/LeaveRequests']);
        });
      }
    }
  }
}
