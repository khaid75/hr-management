import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/employee/service/attendance.service';
import { EmployeeService } from '../service/employee-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService 
  ) {}
  totalEmployees: number = 0;
  totalPresent: number = 0;
  totalAbsent: number = 0;

  ngOnInit() {
    this.getEmployeeStats();
    this.getEmployeeList();
  }

  getEmployeeStats() {
    this.attendanceService.getTotalAttends().subscribe((data: any) => {
      
      this.totalPresent = data;
      this.totalAbsent = this.totalEmployees - this.totalPresent;
    });
    

  
    // this.totalPresent = 80;
    this.totalAbsent = 20;
  }

  getEmployeeList() {
    this.employeeService.getTotalEmployees().subscribe((data: any) => {
      console.log(data);
      
      this.totalEmployees = data;
      this.totalAbsent = this.totalEmployees - this.totalPresent;
    });
  }
}

