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
    { path: 'employees', component: EmployeeListComponent, canActivate: [roleGuard] },
    { path: 'add', component: EmployeeFormComponent, canActivate: [roleGuard] },
    { path: 'edit/:id', component: EmployeeFormComponent, canActivate: [roleGuard] },
    { path: 'approval-requests', component: ApprovalRequestListComponent, canActivate: [roleGuard]},
    { path: 'approval-requests/add', component: ApprovalRequestAddComponent, canActivate: [roleGuard]},
    { path: 'approval-requests/:approverId', component: ApprovalRequestListComponent, canActivate: [roleGuard]},
    { path: 'leaverequests', component: LeaveRequestComponent, canActivate: [roleGuard]},
    { path: 'add-leave-request', component: LeaveRequestFormComponent, canActivate: [roleGuard]},
    { path: 'edit-leave-request/:id', component: LeaveRequestFormComponent, canActivate: [roleGuard]},
    { path: 'projects', component: ProjectListComponent, canActivate: [roleGuard]},
    { path: 'add-project', component: ProjectFormComponent, canActivate: [roleGuard]},
    { path: 'edit-project/:id', component: ProjectFormComponent, canActivate: [roleGuard]},
    { path: 'projects/:id', component: ProjectFormComponent, canActivate: [roleGuard]},
    { path: '**', redirectTo: '/employees'} 
];
