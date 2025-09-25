/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Multi Month Stack calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import multiMonthPlugin from '@fullcalendar/multimonth';

const calendarEl = document.getElementById('multiMonthStackCalendar');
const calendar = new Calendar(calendarEl, {
  plugins: [multiMonthPlugin],
  initialView: 'multiMonthYear',
  multiMonthMaxColumns: 1
});

calendar.render();
