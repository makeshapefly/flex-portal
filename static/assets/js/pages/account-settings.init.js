/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: account settings init Js File
*/

import '../../../../node_modules/virtual-select-plugin/dist/virtual-select';

//Language
VirtualSelect.init({
  ele: '#languageSelect',
  options: [
    { label: 'English', value: '1' },
    { label: 'German', value: '2' },
    { label: 'French', value: '3' },
    { label: 'Russian', value: '4' }
  ],
  multiple: true
});

//Currency
VirtualSelect.init({
  ele: '#currencySelect',
  options: [
    { label: 'USD ($)', value: '1' },
    { label: 'Euro (€)', value: '2' },
    { label: 'Pound (£)', value: '3' },
    { label: 'JPY (¥)', value: '4' }
  ],
  multiple: true
});
