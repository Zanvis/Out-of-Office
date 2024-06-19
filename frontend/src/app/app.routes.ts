import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ApprovalRequestListComponent } from './approval-request-list/approval-request-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ApprovalRequestAddComponent } from './approval-request-add/approval-request-add.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { roleGuard } from './role.guard';

export const routes: Routes = [
    { path: 'Lists/Employees', component: EmployeeListComponent, canActivate: [roleGuard] },
    { path: 'Lists/Employees/add', component: EmployeeFormComponent, canActivate: [roleGuard] },
    { path: 'Lists/Employees/edit/:id', component: EmployeeFormComponent, canActivate: [roleGuard] },
    { path: 'Lists/ApprovalRequests', component: ApprovalRequestListComponent, canActivate: [roleGuard]},
    { path: 'Lists/ApprovalRequests/add', component: ApprovalRequestAddComponent, canActivate: [roleGuard]},
    { path: 'Lists/ApprovalRequests/:approverId', component: ApprovalRequestListComponent, canActivate: [roleGuard]},
    { path: 'Lists/LeaveRequests', component: LeaveRequestComponent, canActivate: [roleGuard]},
    { path: 'Lists/LeaveRequests/add', component: LeaveRequestFormComponent, canActivate: [roleGuard]},
    { path: 'Lists/LeaveRequests/edit/:id', component: LeaveRequestFormComponent, canActivate: [roleGuard]},
    { path: 'Lists/LeaveRequests/:id', component: LeaveRequestFormComponent, canActivate: [roleGuard]},
    { path: 'Lists/Projects', component: ProjectListComponent, canActivate: [roleGuard]},
    { path: 'Lists/Projects/add', component: ProjectFormComponent, canActivate: [roleGuard]},
    { path: 'Lists/Projects/edit/:id', component: ProjectFormComponent, canActivate: [roleGuard]},
    { path: 'Lists/Projects/:id', component: ProjectFormComponent, canActivate: [roleGuard]},
    { path: '**', redirectTo: '/Lists/Employees'} 
];
