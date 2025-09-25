/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: date nav link calendar init Js File
*/

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const calendarEl = document.getElementById('dateNavLinkCalendar')
const calendar = new Calendar(calendarEl, {
    plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin
    ],
    editable: true,
    navLinks: true,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
})

calendar.render()