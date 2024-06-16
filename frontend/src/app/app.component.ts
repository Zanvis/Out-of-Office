import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ApprovalRequestAddComponent } from './approval-request-add/approval-request-add.component';
import { ApprovalRequestListComponent } from './approval-request-list/approval-request-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeListComponent, EmployeeFormComponent, ApprovalRequestListComponent, ApprovalRequestAddComponent, ProjectListComponent, LeaveRequestComponent, LeaveRequestFormComponent, ProjectFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
