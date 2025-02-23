import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { EmployeeComponent } from './employee.component';
import { CreateleaveComponent } from './leave-requests/createleave/createleave.component';
import { LeaveupdateComponent } from './leave-requests/leaveupdate/leaveupdate.component';
import { LeavelistComponent } from './leave-requests/leavelist/leavelist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: EmployeeComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },  // এটি `employee` থেকে `employee/profile` এ রিডাইরেক্ট করবে
      { path: 'profile', component: ProfileComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'leave-requests', component: LeaveRequestsComponent },
      { path: 'dashboard', component: DashboardComponent },
      
      //leave
      { path: 'createleave', component: CreateleaveComponent },
      { path: 'updateleave/update/:id', component: LeaveupdateComponent },
      { path: 'leavelist', component: LeavelistComponent },

      //attendance
      { path: 'admin/attendance', component: AttendanceComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
