import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { EmployeeComponent } from './employee.component';
import { CreateleaveComponent } from './leave-requests/createleave/createleave.component';
import { LeavelistComponent } from './leave-requests/leavelist/leavelist.component';
import { LeaveupdateComponent } from './leave-requests/leaveupdate/leaveupdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ProfileComponent,
    AttendanceComponent,
    LeaveRequestsComponent,
    EmployeeComponent,
    CreateleaveComponent,
    LeavelistComponent,
    LeaveupdateComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
