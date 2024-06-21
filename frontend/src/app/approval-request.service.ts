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
    this.http.put<void>(`${this.baseUrl}/${requestId}`, { Status: 'Approved' }).subscribe();
    return this.http.put<void>(`${this.leaveRequestUrl}/${leaveRequestId}`, { Status: 'Approved' });
  }

  rejectRequest(requestId: number, leaveRequestId: number, comment: string): Observable<void> {
    this.http.put<void>(`${this.baseUrl}/${requestId}`, { Status: 'Rejected', Comment: comment }).subscribe();
    return this.http.put<void>(`${this.leaveRequestUrl}/${leaveRequestId}`, { Status: 'Rejected', Comment: comment });
  }
}
