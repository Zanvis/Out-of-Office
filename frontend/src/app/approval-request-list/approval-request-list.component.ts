import { Component, OnInit } from '@angular/core';
import { ApprovalRequestService } from '../approval-request.service';
import { CommonModule } from '@angular/common';
import { ApprovalRequest } from '../Models/approval-request-model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-approval-request-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './approval-request-list.component.html',
  styleUrl: './approval-request-list.component.css'
})
export class ApprovalRequestListComponent implements OnInit {
  approvalRequests: ApprovalRequest[] = [];
  sortBy: string = 'ID'; // Default sort by ID
  sortDirection: number = 1

  constructor(private approvalRequestService: ApprovalRequestService, private router: Router) {}

  ngOnInit(): void {
    this.loadApprovalRequests();
  }

  loadApprovalRequests(): void {
    this.approvalRequestService.getApprovalRequests().subscribe({
      next: (requests) => {
        this.approvalRequests = requests;
        this.sortApprovalRequests();
      },
      error: (error) => {
        console.error('Error fetching approval requests:', error);
      }
    });
  }

  sortApprovalRequests(): void {
    this.approvalRequests.sort((a, b) => {
      const aValue = this.getPropertyValue(a, this.sortBy);
      const bValue = this.getPropertyValue(b, this.sortBy);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection * aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection * (aValue - bValue);
      } else {
        return 0;
      }
    });
  }

  getPropertyValue(obj: any, propertyPath: string): any {
    return propertyPath.split('.').reduce((o, p) => o && o[p], obj);
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortBy = column;
      this.sortDirection = 1;
    }
    this.sortApprovalRequests();
  }

  // approveRequest(requestId: number): void {
  //   console.log('Approve request with ID:', requestId);
  // }

  // rejectRequest(requestId: number): void {
  //   console.log('Reject request with ID:', requestId);
  // }
}
