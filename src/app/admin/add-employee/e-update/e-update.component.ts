import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee-service.service';

@Component({
  selector: 'app-e-update',
  templateUrl: './e-update.component.html',
  styleUrls: ['./e-update.component.scss']
})
export class EUpdateComponent {
  employeeId: number | null = null;
  employee = { name: '', email: '', phone: '', designation: '' };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
        this.employee = data;
      });
    }
  }

  updateEmployee() {
    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe(() => {
        console.log('Employee updated successfully!');
        this.router.navigate(['/admin/add-employee/list']);
      });
    }
  }
}
