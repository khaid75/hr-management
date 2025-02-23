import { Component, OnInit } from '@angular/core';
import { LeaverequestService } from '../../service/leaverequest.service';

@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.scss']
})
export class LeavelistComponent implements OnInit {

  leaves: any[] = []; // Leave list
  filteredLeaves: any[] = []; // Filtered Leave list for searching
  showUpdateForm: boolean = false; // To toggle update form
  leaveData: any = {}; // Selected leave data for update
  searchQuery: string = ''; // To store search query

  constructor(private leaveService: LeaverequestService) {}

  ngOnInit(): void {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.leaveService.getLeaves().subscribe((data) => {
      this.leaves = data;
      this.filteredLeaves = data; // Initially showing all leaves
      console.log('-------------------', this.leaves);
    });
  }

  // Handle search query change
  onSearchChange() {
    if (this.searchQuery.trim() === '') {
      this.filteredLeaves = this.leaves; // Show all leaves if search is empty
    } else {
      this.filteredLeaves = this.leaves.filter(leave =>
        leave.employeeName.toLowerCase().includes(this.searchQuery.toLowerCase())  // Filtering based on employee name
      );
    }
  }

  editLeave(id: number) {
    this.leaveService.getLeaveById(id).subscribe((data) => {
      this.leaveData = data; // Load leave data for update
      this.showUpdateForm = true; // Show the update form
    });
  }

  onUpdate() {
    this.leaveService.updateLeave(this.leaveData.id, this.leaveData).subscribe(() => {
      alert('Leave updated successfully!');
      this.getAllLeaves(); // Refresh the list
      this.showUpdateForm = false; // Hide the update form
    });
  }

  deleteLeave(id: number) {
    this.leaveService.deleteLeave(id).subscribe(() => {
      alert('Leave deleted successfully!');
      this.getAllLeaves(); // Refresh the list
    });
  }
}