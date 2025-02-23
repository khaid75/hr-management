import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../service/attendance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  attendances: any[] = [];
  newAttendance = { employeeId:0, name: '', date: '', checkInTime: '', checkOutTime: '', status: '', userName: '' };

  constructor(private attendanceService: AttendanceService, private userService : UserService, private storageService: StorageService) {}
  ngOnInit() {
    this.loadAttendance();
  }

  // loadAttendance() {
  //   this.attendanceService.getAllAttendance().subscribe((data:any) => {
  //     this.attendances = data;
  //     console.log('-------this.attendances------', this.attendances );
  //   });
  // }

  loadAttendance() {
    this.attendanceService.getAllAttendance().subscribe(data => {
      this.attendances = data.map(attendance => {
        return {
          ...attendance,
          date: this.convertToDate(attendance.date),
          checkInTime: this.convertToLocalTime(attendance.checkInTime),
          checkOutTime: this.convertToLocalTime(attendance.checkOutTime)
        };
      });
    });
  }

addAttendance() {

const userName = this.storageService.getUser().user_name;
this.newAttendance.userName = userName;
this.newAttendance.date = this.getCurrentDate();
this.newAttendance.checkInTime = this.getCurrentTime();
this.newAttendance.checkOutTime = this.getCurrentTime();

    this.attendanceService.addAttendance(this.newAttendance).subscribe(() => {
      this.loadAttendance();
      this.newAttendance = {employeeId:0, name: '', date: '', checkInTime: '', checkOutTime: '', status: '', userName: '' };
    });
  }
  private getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }


  deleteAttendance(id: number): void {
    this.attendanceService.deleteAttendance(id).subscribe({
      next: (response) => {
        console.log('Deleted successfully:', response);
        this.loadAttendance(); // লিস্ট রিফ্রেশ করতে
      },
      error: (err) => console.error('Error deleting attendance:', err)
    });
  }


  convertToDate(dateArray: number[]) {
    // JavaScript months are 0-based (January = 0, February = 1, etc.)
    return dateArray[0]+'-'+dateArray[1]+'-'+ dateArray[2];
  }

  // Convert the time array [HH, MM, SS, NANOSECONDS] to a string "HH:mm:ss"
  convertToLocalTime(timeArray: number[]): string {
    let hours = '00';
    let minutes = '00';

    let seconds = '00';

    if(timeArray.length>2){
      hours = timeArray[0].toString().padStart(2, '0');
      minutes = timeArray[1].toString().padStart(2, '0');
      seconds = timeArray[2].toString().padStart(2, '0');
    }
 
    return `${hours}:${minutes}:${seconds}`;
  }
}

