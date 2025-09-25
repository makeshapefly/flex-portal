/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: list view calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

const calendarEl = document.getElementById('listViewCalendar');
const calendar = new Calendar(calendarEl, {
  timeZone: 'America/New_York',
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'timeGridWeek,timeGridDay' // user can switch between the two
  }
});

calendar.render();
