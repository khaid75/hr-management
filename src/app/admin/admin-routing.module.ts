import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { ReportsComponent } from './reports/reports.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ECreateComponent } from './add-employee/e-create/e-create.component';
import { EListComponent } from './add-employee/e-list/e-list.component';
import { EUpdateComponent } from './add-employee/e-update/e-update.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'employee-list', component: EmployeeListComponent },

  { path: 'attendance', component: AttendanceComponent },
  { path: 'leave-management', component: LeaveManagementComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'payroll', component: PayrollComponent },

  { path: 'add-employee/create', component: ECreateComponent },
  { path: 'add-employee/update/:id', component: EUpdateComponent },
  { path: 'add-employee/list', component: EListComponent },

  // { path: '', component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
