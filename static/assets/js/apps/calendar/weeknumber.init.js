/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: week number calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

const calendarEl = document.getElementById('weekNumberCalendar');
const calendar = new Calendar(calendarEl, {
  timeZone: 'America/New_York',
  plugins: [interactionPlugin, dayGridPlugin],
  weekNumbers: true
});

calendar.render();
