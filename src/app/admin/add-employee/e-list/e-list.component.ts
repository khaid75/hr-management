import { Component } from '@angular/core';
import { EmployeeService } from '../../service/employee-service.service';

@Component({
  selector: 'app-e-list',
  templateUrl: './e-list.component.html',
  styleUrls: ['./e-list.component.scss'],
})
export class EListComponent {
  getUrl(arg0: any) {
    const img = "http://localhost:8081/" + arg0.replace("src/main/resources/static/","");
    console.log(img, '-------------------------------img');
    return img;
  }


  employees: any[] = [];
  filteredEmployee: any = null; // To store filtered employee details
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  // Fetch all employees from the service
  getAllEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);

      this.employees = data;
      this.filteredEmployee = null; // Reset filtered employee when reloading
    });
  }

  // Delete employee by id
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      console.log('Employee deleted successfully!');
      this.getAllEmployees(); // Refresh the list after deletion
    });
  }

  // Search for employee based on name
  onSearch() {
    if (this.searchQuery) {
      this.filteredEmployee = this.employees.find(
        (employee) =>
          employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) // Modified to allow partial search
      );
    } else {
      this.filteredEmployee = null; // Clear the filter if search query is empty
    }
  }

  // Function to handle report download on click
  onDownloadReport(format: string): void {
    const url = `http://localhost:8081/report/${format}`;

    // Create an anchor tag dynamically and trigger a click event
    const link = document.createElement('a');
    link.href = url;
    link.download = `report.${format}`; // Optional, you can set a default name here
    link.click(); // Trigger the download
  }
}
