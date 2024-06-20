import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovalRequest } from './Models/approval-request-model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestService {
  private baseUrl = 'http://localhost:3000/Lists/ApprovalRequests';
  private leaveRequestUrl = 'http://localhost:3000/Lists/LeaveRequests';

  constructor(private http: HttpClient) { }

  getApprovalRequests(): Observable<ApprovalRequest[]> {
    return this.http.get<ApprovalRequest[]>(this.baseUrl);
  }

  getApprovalRequest(id: number): Observable<ApprovalRequest> {
    return this.http.get<ApprovalRequest>(`${this.baseUrl}/${id}`);
  }

  addApprovalRequest(approvalRequest: ApprovalRequest): Observable<ApprovalRequest> {
    return this.http.post<ApprovalRequest>(this.baseUrl, approvalRequest);
  }

  updateApprovalRequest(id: number, approvalRequest: ApprovalRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, approvalRequest);
  }

  deleteApprovalRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  approveRequest(requestId: number, leaveRequestId: number): Observable<void> {
    // Update approval request status to "Approved"
    this.http.put<void>(`${this.baseUrl}/${requestId}`, { Status: 'Approved' }).subscribe();
    // Update leave request status to "Approved" and recalculate absence balance
    return this.http.put<void>(`${this.leaveRequestUrl}/${leaveRequestId}`, { Status: 'Approved' });
  }

  rejectRequest(requestId: number, leaveRequestId: number, comment: string): Observable<void> {
    // Update approval request status to "Rejected" with a comment
    this.http.put<void>(`${this.baseUrl}/${requestId}`, { Status: 'Rejected', Comment: comment }).subscribe();
    // Update leave request status to "Rejected" with a comment
    return this.http.put<void>(`${this.leaveRequestUrl}/${leaveRequestId}`, { Status: 'Rejected', Comment: comment });
  }
}
