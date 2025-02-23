import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaverequestService } from '../../service/leaverequest.service';

@Component({
  selector: 'app-createleave',
  templateUrl: './createleave.component.html',
  styleUrls: ['./createleave.component.scss']
})
export class CreateleaveComponent {
  leaveData = {
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    status: 'Pending'
  };


  constructor(private leaveService: LeaverequestService, private router: Router) {}

  onSubmit() {
    if (!this.leaveData.employeeName || !this.leaveData.leaveType || !this.leaveData.startDate || !this.leaveData.endDate) {
      alert('Please fill all the fields.');
      return;
    }
    
    this.leaveService.addLeave(this.leaveData).subscribe({
      next: () => {
        alert('Leave created successfully!');
        this.router.navigate(['/leave-management/list']);
      },
      error: (err) => {
        console.error('Error creating leave:', err);
        alert('Failed to create leave. Please try again.');
      }
    });
  }
}
