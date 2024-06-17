import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  sortBy: string = 'ID'; // Default sort by ID
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  constructor(private employeeService: EmployeeService, private router: Router, public roleService: RoleService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = this.employees;
      this.sortEmployees(); // Initial sorting
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.ID !== id);
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  sortEmployees(): void {
    this.employees.sort((a, b) => {
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
    this.sortEmployees();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployees = this.employees.filter((request) =>
      Object.values(request).some(value =>
        (value !== null && value !== undefined) && value.toString().toLowerCase().includes(filterValue)
      )
    );
  }
  searchByRequestId(event: Event): void {
    const requestId = (event.target as HTMLInputElement).value;
    if (requestId) {
      this.filteredEmployees = this.employees.filter(request =>
        request.ID === parseInt(requestId, 10)
      );
    } else {
      this.filteredEmployees = [...this.employees];
    }
  }
}
