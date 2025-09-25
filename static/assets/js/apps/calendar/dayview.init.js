/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: day view calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

const calendarEl = document.getElementById('dayGridViewCalendar');
const calendar = new Calendar(calendarEl, {
  timeZone: 'America/New_York',
  plugins: [dayGridPlugin],
  initialView: 'dayGridWeek',
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridWeek,dayGridDay' // user can switch between the two
  }
});

calendar.render();
