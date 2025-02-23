import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { ReportsComponent } from './reports/reports.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './service/employee-service.service';
import { ECreateComponent } from './add-employee/e-create/e-create.component';
import { EUpdateComponent } from './add-employee/e-update/e-update.component';
import { EListComponent } from './add-employee/e-list/e-list.component';
import { AttendanceService } from '../employee/service/attendance.service';









@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    EmployeeListComponent,
    AttendanceComponent,
    LeaveManagementComponent,
    ReportsComponent,
    PayrollComponent,
    AdminComponent,
    ECreateComponent,
    EUpdateComponent,
    EListComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [EmployeeService,AttendanceService],
})
export class AdminModule { }
