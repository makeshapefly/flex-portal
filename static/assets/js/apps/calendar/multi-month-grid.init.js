/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Multi Month grid calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import multiMonthPlugin from '@fullcalendar/multimonth';

const calendarEl = document.getElementById('multiMonthGridCalendar');
const calendar = new Calendar(calendarEl, {
  plugins: [multiMonthPlugin],
  themeSystem: 'sketchy',
  initialView: 'multiMonthYear'
});

calendar.render();
