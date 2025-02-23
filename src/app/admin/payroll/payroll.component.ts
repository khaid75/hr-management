import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../service/payroll.service';
import { Payroll } from '../models/payroll';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  payrolls: Payroll[] = [];
  searchQuery: string = '';

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ✅ এখানে new Payroll() ব্যবহার করা হয়নি, সরাসরি object assign করা হয়েছে
  newPayroll: Payroll = {
    id: null,
    salary: 0,
    employeeName: '',
    designation: '',
    month: '',
    year: ''
  };


  constructor(private payrollService: PayrollService, private http: HttpClient) {}

  pdfSrc: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe((data: Payroll[]) => {
      this.payrolls = data;
    });
  }

  searchPayroll(): void {
    if (this.searchQuery) {
      this.payrollService.searchPayroll(this.searchQuery).subscribe((data: Payroll[]) => {
        this.payrolls = data;
      });
    } else {
      this.loadPayrolls();
    }
  }

  addPayroll(): void {
    this.payrollService.addPayroll(this.newPayroll).subscribe(() => {
      this.loadPayrolls();
      this.resetPayrollForm(); // ✅ ফর্ম রিসেট
    });
  }

  deletePayroll(id: number): void {
    this.payrollService.deletePayroll(id).subscribe(() => {
      this.loadPayrolls();
    });
  }

  // ✅ ফর্ম রিসেট করার জন্য আলাদা ফাংশন
  resetPayrollForm(): void {
    this.newPayroll = {
      id: 0,
      salary: 0,
      employeeName: '',
      designation: '',
      month: '',
      year: ''
    };
  }


  generateReport(format: string): void {
    this.http.get(`http://localhost:8081/payload/${format}`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(response);

        // Create an anchor tag for downloading
        const a = document.createElement('a');
        a.href = blobUrl;

        // Set the file name for the download
        a.download = `payroll_report.${format}`;

        // Append the anchor tag to the body and trigger click
        document.body.appendChild(a);
        a.click();

        // Clean up the created URL and anchor tag
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);

        console.log('Payroll report generated successfully');
      },
      error => {
        console.error('Error generating payroll report', error);
      }
    );
  }
  
}
