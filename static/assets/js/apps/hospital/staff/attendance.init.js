/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Attendances init Js File
*/

import attendanceData from '../../../../json/apps/hospital/staff/attendance';

//Attendance table
function attendanceTable() {
  return {
    attendances: [],
    sortBy: '',
    sortDirection: 'asc',
    deletedAttendance: '',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 5,
    get totalPages() {
      return Math.ceil(this.attendances.length / this.itemsPerPage);
    },
    get displayedAttendances() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.attendances.slice(start, end).map((attendance) => ({
        ...attendance,
        formattedDate: this.formatDate(attendance.date)
      }));
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.attendances.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.attendances.length);
    },
    init() {
      let startID = 22697; // Starting ID
      attendanceData.forEach((report, index) => {
        // Generate categoryID starting from "PEC-24151"
        report.attendanceIDs = 'PER-' + (startID + index).toString();

        // Calculate workedTime and differenceTime
        const checkIn = this.parseTime(report.checkInTime);
        const checkOut = this.parseTime(report.checkOutTime);
        const workedTime = this.calculateWorkedTime(checkIn, checkOut);
        const shiftTime = { hours: 9, minutes: 0 }; // 9 hrs shift
        report.workedTime = this.formatTime(workedTime);
        const difference = this.calculateDifferenceTime(workedTime, shiftTime);
        report.differenceTime = this.formatTime(difference);
      });
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.attendances = attendanceData;
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
      return formattedDate.replace(/(?<=\d) (?=\d{4})/, ', ');
    },
    parseTime(timeStr) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'pm' && hours !== 12) {
        hours += 12;
      } else if (modifier === 'am' && hours === 12) {
        hours = 0;
      }

      return { hours, minutes };
    },
    calculateWorkedTime(checkIn, checkOut) {
      let hours = checkOut.hours - checkIn.hours;
      let minutes = checkOut.minutes - checkIn.minutes;
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) hours += 24;
      return { hours, minutes };
    },
    calculateDifferenceTime(workedTime, shiftTime) {
      let hours = workedTime.hours - shiftTime.hours;
      let minutes = workedTime.minutes - shiftTime.minutes;
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      return { hours, minutes };
    },
    formatTime(time) {
      const hours = Math.abs(time.hours);
      const minutes = Math.abs(time.minutes);
      const sign = time.hours < 0 || time.minutes < 0 ? '-' : '';
      return `${sign}${hours} hrs ${minutes} min`;
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.attendances.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    deleteAttendance() {
      this.attendances.forEach((attendance) => {
        if (attendance.attendanceIDs === this.deletedAttendance) {
          this.attendances.splice(this.attendances.indexOf(attendance), 1);
        }
      });
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('attendanceTable', attendanceTable);
});
