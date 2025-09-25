/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: select init Js File
*/

import '../../../../node_modules/virtual-select-plugin/dist/virtual-select';

function getOptions(count = 10, includeDesc = false) {
  const optionsData = [];
  for (let i = 1; i <= count; i += 1) {
    const optionData = { value: i, label: `Option ${i}` };
    if (includeDesc) optionData.description = `Description ${i}`;
    optionsData.push(optionData);
  }
  return optionsData;
}

//Default select
VirtualSelect.init({
  ele: '#sampleSelect',
  options: getOptions(3)
});

//With search box
VirtualSelect.init({
  ele: '#searchBoxSelect',
  options: getOptions(3),
  search: true
});

//Multiple select
VirtualSelect.init({
  ele: '#multipleSelect',
  options: getOptions(3),
  multiple: true
});

//Multiple select without search
VirtualSelect.init({
  ele: '#multipleWithoutSearchSelect',
  options: getOptions(8),
  multiple: true,
  search: false
});

//Disabled options
VirtualSelect.init({
  ele: '#disabledOptionSelect',
  options: getOptions(8),
  disabledOptions: [2, 6, 8]
});

//Option group
VirtualSelect.init({
  ele: '#optionGroupSelect',
  options: [
    {
      label: 'Option Group 1',
      options: [
        { label: 'Options 1', value: '1' },
        { label: 'Options 2', value: '2' },
        { label: 'Options 3', value: '3' },
        { label: 'Options 4', value: '4' },
        { label: 'Options 5', value: '5' },
        { label: 'Options 6', value: '6' },
        { label: 'Options 7', value: '7' },
        { label: 'Options 8', value: '8' }
      ]
    },
    {
      label: 'Option Group 2',
      options: [
        { label: 'Options 1', value: '1' },
        { label: 'Options 2', value: '2' },
        { label: 'Options 3', value: '3' },
        { label: 'Options 4', value: '4' },
        { label: 'Options 5', value: '5' },
        { label: 'Options 6', value: '6' },
        { label: 'Options 7', value: '7' },
        { label: 'Options 8', value: '8' }
      ]
    }
  ],
  multiple: true
});

//Preselect value
VirtualSelect.init({
  ele: '#preselectValue',
  options: getOptions(8),
  selectedValue: 3
});

//Preselect multiple values
VirtualSelect.init({
  ele: '#preselectMultipleValue',
  options: getOptions(8),
  multiple: true,
  selectedValue: [3, 4]
});

//Hide clear button
VirtualSelect.init({
  ele: '#hideClearButton',
  options: getOptions(8),
  hideClearButton: true
});

//Custom width for dropbox
VirtualSelect.init({
  ele: '#customWidthDropbox',
  options: getOptions(8),
  dropboxWidth: '130px'
});

//Allow to add new option
VirtualSelect.init({
  ele: '#allowNewOption',
  options: getOptions(8),
  allowNewOption: true
});

//Mark matched term in label
VirtualSelect.init({
  ele: '#markMatchedLabel',
  options: getOptions(8),
  search: true,
  markSearchResults: true
});

//Showing selected options first
VirtualSelect.init({
  ele: '#showingSelectedOption',
  options: getOptions(8),
  multiple: true,
  showSelectedOptionsFirst: true
});

//Using alias for searching
VirtualSelect.init({
  ele: '#aliasForSearching',
  options: [
    { label: 'Colors', value: 'colors', alias: 'Orange, Red' },
    { label: 'Fruits', value: 'fruits', alias: ['Orange', 'Apple'] },
    { label: 'Months', value: 'months', alias: 'January' },
    { label: 'Others', value: 'others' }
  ]
});

//Maximum values
VirtualSelect.init({
  ele: '#maximumValues',
  options: getOptions(8),
  multiple: true,
  maxValues: 4
});

//Label with description
VirtualSelect.init({
  ele: '#labelDescription',
  options: getOptions(3),
  hasOptionDescription: true
});

//Show options only on search
VirtualSelect.init({
  ele: '#showOptionOnlySearch',
  options: getOptions(8),
  showOptionsOnlyOnSearch: true
});

//Initialize from native select element (not recommended)
VirtualSelect.init({ ele: 'select' });

// image/icon
VirtualSelect.init({
  ele: '#sample-image',
  options: [
    {
      label: 'Options 1',
      value: '1',
      description: 'Description 1',
      classNames: 'fo'
    },
    {
      label: 'Options 2',
      value: '2',
      description: 'Description 2',
      classNames: 'nz'
    },
    {
      label: 'Options 3',
      value: '3',
      description: 'Description 3',
      classNames: 'bi'
    }
  ],
  labelRenderer: sampleLabelRenderer
});

function sampleLabelRenderer(data) {
  let prefix = '';
  /** skipping options those are added newly by allowNewOption feature */
  if (!data.isCurrentNew && !data.isNew)
    /** project developer has to add their own logic to create image/icon tag */
    prefix = `<i class="flag flag-${data.classNames} ltr:mr-2 rtl:ml-2"></i>`;
  return `${prefix}${data.label}`;
}

// popup multi select
VirtualSelect.init({
  ele: '#popup-multi-select',
  zIndex: 9999,
  options: getOptions(10),
  dropboxWrapper: 'body',
  popupDropboxBreakpoint: '3000px',
  placeholder: 'Select multiple values',
  multiple: true
});

VirtualSelect.init({
  ele: '#popup-single-select',
  zIndex: 9999,
  options: getOptions(5),
  dropboxWrapper: 'body',
  popupDropboxBreakpoint: '3000px',
  placeholder: 'Select Single values',
  multiple: false
});

VirtualSelect.init({
  ele: '#value-tag',
  options: getOptions(5),
  dropboxWrapper: 'body',
  multiple: true,
  showValueAsTags: true
});
