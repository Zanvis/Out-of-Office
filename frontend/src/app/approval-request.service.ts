import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovalRequest } from './Models/approval-request-model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestService {
  private baseUrl = 'http://localhost:3000/approval-requests';

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
}
