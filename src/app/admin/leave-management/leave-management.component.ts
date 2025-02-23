import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../service/leave.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {
  
  leaves: any[] = [];
  searchQuery: string = '';
  filterStatus: string = '';

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getAllLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  loadPendingLeaves(): void {
    this.leaveService.getLeavesByStatus('PENDING').subscribe(data => {
      this.leaves = data;
    });
  }

  searchLeaves() {
    if (this.searchQuery) {
      this.leaves = this.leaves.filter(leave =>
        leave.employeeName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadLeaves();
    }
  }

  filterLeaves() {
    if (this.filterStatus) {
      this.leaves = this.leaves.filter(leave => leave.status === this.filterStatus);
    } else {
      this.loadLeaves();
    }
  }

  updateStatus(id: number, status: string) {
    this.leaveService.updateLeaveStatus(id, status).subscribe(() => {
      this.loadLeaves();
    });
  }

  deleteLeave(id: number) {
    if (confirm('Are you sure you want to delete this leave?')) {
      this.leaveService.deleteLeave(id).subscribe(() => {
        this.loadLeaves();
      });
    }
  }
}
