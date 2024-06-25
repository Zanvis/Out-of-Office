import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  id!: number;
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      FullName: ['', Validators.required],
      Subdivision: ['', Validators.required],
      Position: ['', Validators.required],
      Status: ['', Validators.required],
      PeoplePartner: [0, Validators.required],
      OutOfOfficeBalance: [0, Validators.required],
      Photo: [null]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.employeeService.getEmployee(this.id).subscribe((data) => {
        this.employeeForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData = this.employeeForm.value;
    if (this.id) {
      this.employeeService.updateEmployee(this.id, employeeData, this.selectedFile).subscribe(() => {
        this.router.navigate(['/Lists/Employees']);
      });
    } else {
      this.employeeService.addEmployee(employeeData, this.selectedFile!).subscribe(() => {
        this.router.navigate(['/Lists/Employees']);
      });
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.employeeForm.get('Photo')!.setValue(this.selectedFile);
    }
  }
}
