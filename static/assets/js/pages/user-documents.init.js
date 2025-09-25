/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: user documents init Js File
*/

import '../../../../node_modules/virtual-select-plugin/dist/virtual-select';

//Multiple select
VirtualSelect.init({
  ele: '#multipleSelect',
  options: [
    { label: 'Docs', value: '1' },
    { label: 'PDF', value: '2' },
    { label: 'Zip', value: '3' },
    { label: 'Images & Video', value: '4' },
    { label: 'Others', value: '5' }
  ],
  multiple: true
});
