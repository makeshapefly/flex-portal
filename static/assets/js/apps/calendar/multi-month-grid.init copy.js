/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Multi Month grid calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const calendarEl = document.getElementById('multiMonthGridCalendar');
const calendar = new Calendar(calendarEl, {
  plugins: [resourceTimelinePlugin],
  timeZone: 'UTC',
  headerToolbar: {
    left: 'today prev,next',
    center: 'title',
    right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'
  },
  initialView: 'resourceTimelineDay',
  scrollTime: '08:00',
  aspectRatio: 1.5,
  views: {
    resourceTimelineDay: {
      buttonText: ':15 slots',
      slotDuration: '00:15'
    },
    resourceTimelineTenDay: {
      type: 'resourceTimeline',
      duration: { days: 10 },
      buttonText: '10 days'
    }
  },
  editable: true,
  resourceAreaHeaderContent: 'Rooms',
  resources: 'https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors',
  events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
});

calendar.render();
