/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: timeline calendar init Js File
*/

import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import eventsData from '../../../json/apps/calendar/event';

const calendarEl = document.getElementById('timelineCalendar');
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
  resources: eventsData,
  events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
});

calendar.render();
