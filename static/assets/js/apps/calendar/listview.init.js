/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: list view calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

const calendarEl = document.getElementById('listViewCalendar');
const calendar = new Calendar(calendarEl, {
  plugins: [listPlugin],
  editable: true,
  initialView: 'listWeek',
  events: [
    { title: 'Meeting', start: new Date() },
    { title: 'Update Weekly', start: new Date() }
  ]
});

calendar.render();
