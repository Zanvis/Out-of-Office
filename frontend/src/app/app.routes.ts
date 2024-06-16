import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ApprovalRequestListComponent } from './approval-request-list/approval-request-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ApprovalRequestAddComponent } from './approval-request-add/approval-request-add.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';

export const routes: Routes = [
    { path: 'employees', component: EmployeeListComponent },
    { path: 'add', component: EmployeeFormComponent },
    { path: 'edit/:id', component: EmployeeFormComponent },
    { path: 'approval-requests', component: ApprovalRequestListComponent},
    { path: 'approval-requests/add', component: ApprovalRequestAddComponent },
    { path: 'approval-requests/:approverId', component: ApprovalRequestListComponent},
    { path: 'leaverequests', component: LeaveRequestComponent },
    { path: 'add-leave-request', component: LeaveRequestFormComponent },
    { path: 'edit-leave-request/:id', component: LeaveRequestFormComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'add-project', component: ProjectFormComponent },
    { path: 'edit-project/:id', component: ProjectFormComponent },
    { path: 'projects/:id', component: ProjectFormComponent },
    { path: '**', redirectTo: '/employees'} 
];
