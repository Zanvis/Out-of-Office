import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/Lists/Employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  // addEmployee(employee: Employee): Observable<Employee> {
  //   return this.http.post<Employee>(this.baseUrl, employee);
  // }

  // updateEmployee(id: number, employee: Employee): Observable<Employee> {
  //   return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  // }
  addEmployee(employee: Employee, photo: File): Observable<Employee> {
    const formData = new FormData();
    formData.append('employee', JSON.stringify(employee));
    formData.append('photo', photo);

    return this.http.post<Employee>(this.baseUrl, formData);
  }

  updateEmployee(id: number, employee: Employee, photo: File | null): Observable<Employee> {
    const formData = new FormData();
    formData.append('employee', JSON.stringify(employee));
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.put<Employee>(`${this.baseUrl}/${id}`, formData);
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  assignProject(employeeId: number, projectId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${employeeId}/assignProject`, { projectId });
  }
}
