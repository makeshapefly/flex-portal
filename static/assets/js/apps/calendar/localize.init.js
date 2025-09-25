/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: localize calendar init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import allLocales from '@fullcalendar/core/locales-all';

const calendarEl = document.getElementById('localizeCalendar');

const calendar = new Calendar(calendarEl, {
  timeZone: 'America/New_York',
  plugins: [interactionPlugin, dayGridPlugin],
  locales: allLocales,
  locale: 'en' // the initial locale
});

calendar.render();

// Initialize VirtualSelect
VirtualSelect.init({
  ele: '#localizeSelect',
  options: [
    { label: 'English (EN-AU)', value: 'en-au' },
    { label: 'Arabic (AR)', value: 'ar' },
    { label: 'German (DE)', value: 'de' },
    { label: 'Russian (RU)', value: 'ru' },
    { label: 'French (FR)', value: 'fr' },
    { label: 'Italian (IT)', value: 'it' },
    { label: 'Danish (DA)', value: 'da' },
    { label: 'Chinese (ZH)', value: 'zh' },
    { label: 'Korean (KO)', value: 'ko' },
    { label: 'Greek (EL)', value: 'el' },
    { label: 'Finnish (FI)', value: 'fi' },
    { label: 'Persian (FA)', value: 'fa' },
    { label: 'Catalan, Valencian (CA)', value: 'ca' }
  ]
});

// Directly add event listener for change
const localizeSelect = document.getElementById('localizeSelect');
localizeSelect.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  calendar.setOption('locale', selectedValue);
  calendar.render(); // Re-render the calendar
});

// Test with hardcoded locale change
setTimeout(() => {
  calendar.setOption('locale', 'en-au'); // Change to French
  calendar.render(); // Re-render the calendar
}, 1000);
