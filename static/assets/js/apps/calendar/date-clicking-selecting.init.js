/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: date clicking selecting calendar init Js File
*/

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const calendarEl = document.getElementById('dateClickingSelectingCalendar')
const calendar = new Calendar(calendarEl, {
    plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin
    ],
    selectable: true,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: function (info) {
        alert('clicked ' + info.dateStr);
    },
    select: function (info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr);
    }
})

calendar.render()