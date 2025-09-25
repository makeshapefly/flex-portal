import scheduleData from "../../../../json/apps/hospital/schedule/schedule";

function datePicker() {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return {
        months: monthNames,
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        selectedMonth: today.getMonth(),
        selectedYear: today.getFullYear(),
        todayDay: today.getDate(),
        todayMonth: today.getMonth(),
        todayYear: today.getFullYear(),
        dates: [],
        appointments: [],
        selectedAppointments: [],

        init() {
            this.generateDates();
            this.fetchAppointments();
        },
        formatDate(date) {
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            return `${monthNames[monthIndex]}, ${year}`;
        },
        selectMonth(index) {
            this.selectedMonth = index;
            this.generateDates();
            this.filterAppointments();
            this.close(this.$refs.button);
        },
        generateDates() {
            const year = this.selectedYear;
            const month = this.selectedMonth;
            const date = new Date(year, month, 1);
            this.dates = [];
            while (date.getMonth() === month) {
                this.dates.push({
                    day: date.getDate(),
                    name: this.days[date.getDay()],
                    formattedDate: this.formatDate(date), // Format the date
                    isToday: date.getDate() === this.todayDay && month === this.todayMonth && year === this.todayYear
                });
                date.setDate(date.getDate() + 1);
            }
        },
        fetchAppointments() {
            scheduleData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });
            this.appointments = scheduleData;
            this.updateAppointmentsToCurrentMonth(); // Move this here to ensure appointments are fetched first
            this.filterAppointments();
            const scrollableDiv = document.getElementById('scrollTodayDate')?.querySelector(".simplebar-content-wrapper");
            if(scrollableDiv) {
                const activeDiv = scrollableDiv.querySelector("a.active-date");
                const leftPos = scrollableDiv.clientWidth / 2 - 32;
                if(activeDiv && activeDiv.offsetLeft > leftPos) {
                    scrollableDiv.scrollBy({
                        left: activeDiv.offsetLeft - leftPos, // Use the vertical scroll delta to scroll vertically
                        behavior: 'smooth'  // Apply smooth scrolling
                    });
                }
            }
        },
        updateAppointmentsToCurrentMonth() {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth(); // Note: Months are zero-based

            // Generate all possible dates for the current month
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const allDates = [];
            for (let day = 1; day <= daysInMonth; day++) {
                allDates.push(new Date(currentYear, currentMonth, day));
            }
            // Shuffle the dates
            for (let i = allDates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allDates[i], allDates[j]] = [allDates[j], allDates[i]];
            }
            // Assign shuffled dates to appointments
            this.appointments = this.appointments.map((appointment, index) => {
                return {
                    ...appointment,
                    date: allDates[index % allDates.length].toISOString() // Ensure dates are reused if there are more appointments than days
                };
            });
        },
        scrollDivToActive() {
            const scrollableDiv = document.getElementById('scrollTodayDate')?.querySelector(".simplebar-content-wrapper");

            // Add an event listener for the mouse wheel event
            scrollableDiv?.addEventListener('wheel', function (event) {
                event.preventDefault(); // Prevent default vertical scrolling

                // Scroll the div horizontally by the delta of the mouse wheel
                scrollableDiv.scrollLeft += event.deltaY;
            });
        },
        filterAppointments() {
            const selectedDate = new Date(this.selectedYear, this.selectedMonth, 1);
            const filteredAppointments = this.appointments.filter(appointment => {
                const appointmentDate = new Date(appointment.date);
                return appointmentDate.getMonth() === selectedDate.getMonth() && appointmentDate.getFullYear() === selectedDate.getFullYear();
            });
            this.selectedAppointments = filteredAppointments.map(appointment => ({
                ...appointment,
                formattedDate: this.formatDate(new Date(appointment.date)) // Format the date
            }));
            this.scrollDivToActive();
        },
        selectDate(date) {
            this.selectedYear = date.isToday ? this.todayYear : this.selectedYear;
            this.selectedMonth = date.isToday ? this.todayMonth : this.selectedMonth;
            this.filterAppointments();
        }
    };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
    Alpine.data('datePicker', datePicker);
});