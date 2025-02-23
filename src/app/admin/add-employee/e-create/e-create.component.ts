import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-e-create',
  templateUrl: './e-create.component.html',
  styleUrls: ['./e-create.component.scss']
})
export class ECreateComponent implements OnInit{
  employee = { name: '', email: '', mobile: '', department: '', username: '' };
  imageFile: File | null = null;

  constructor(private employeeService: EmployeeService, private router: Router, private userService: UserService) {}

  users:any[] = [];

  departments = ['HR', 'Finance', 'Engineering', 'Sales'];

  getAllUserName() {
    this.userService.getTotalAll().subscribe({
      next: (val) => {
        this.users = val;  // Assign the fetched users to the users array
        console.log('Users fetched successfully:', this.users);  // Optional: log users for debugging
      },
      error: (err) => {
        console.error('Error fetching users:', err);  // Log error in case of failure
      },
    });
  }

  // ngOnInit lifecycle hook to call getAllUserName when component is initialized
  ngOnInit() {
    this.getAllUserName();
  }





  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }
  addEmployee() {

    const formData: FormData = new FormData();

    console.log(this.imageFile);
    
    formData.append('name', this.employee.name);
    formData.append('email', this.employee.email);
    formData.append('mobile', this.employee.mobile);
    formData.append('department', this.employee.name);


    if (this.imageFile) {
      formData.append('imageFile', this.imageFile,  this.imageFile.name);
    }

    // Append the metadata to the FormData object
    // formData.append('department', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));


    this.employeeService.addEmployee(formData).subscribe(() => {
      console.log('Employee added successfully!');
      // this.router.navigate(['/admin/add-employees/list']);
    });
  }

}
