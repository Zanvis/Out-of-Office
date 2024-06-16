import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from '../Models/leave-request-model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LeaveRequestsService } from '../leave-requests.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent implements OnInit{
  leaveRequests: LeaveRequest[] = [];
  sortBy: string = 'ID'; // Default sort by ID
  sortDirection: number = 1

  constructor(private leaveRequestService: LeaveRequestsService, private router: Router) { }

  ngOnInit(): void {
    this.getLeaveRequests();
  }

  getLeaveRequests(): void {
    this.leaveRequestService.getLeaveRequests().subscribe((data) => {
      this.leaveRequests = data;
      this.sortLeaveRequests();
    });
  }

  deleteLeaveRequest(id: number): void {
    this.leaveRequestService.deleteLeaveRequest(id).subscribe(() => {
      this.leaveRequests = this.leaveRequests.filter(request => request.ID !== id);
    });
  }

  editLeaveRequest(id: number): void {
    this.router.navigate(['/edit-leave-request', id]);
  }

  sortLeaveRequests(): void {
    this.leaveRequests.sort((a, b) => {
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
    this.sortLeaveRequests();
  }
}
