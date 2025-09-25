import { writable } from 'svelte/store';

// Store for select options
export const selectOptions = writable([]);

// Store for Virtual Select configurations
export const selectConfig = writable({
	sampleSelect: {
		options: getOptions(3),
		search: false,
		multiple: false,
		preselect: null,
		disabledOptions: []
	},
	searchBoxSelect: {
		options: getOptions(3),
		search: true,
		multiple: false
	},

	multipleSelect: {
		options: getOptions(3),
		search: false,
		multiple: true
	},

	multipleWithoutSearchSelect: {
		options: getOptions(8),
		multiple: true,
		search: false
	},

	disabledOptionSelect: {
		options: getOptions(8),
		disabledOptions: [2, 6, 8]
	},

	optionGroupSelect: {
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
	},

	preselectValue: {
		options: getOptions(8),
		preselect: 3
	},

	preselectMultipleValue: {
		options: getOptions(8),
		multiple: true,
		preselect: [3, 4]
	},

	hideClearButton: {
		options: getOptions(8),
		hideClearButton: true
	},

	customWidthDropbox: {
		options: getOptions(8),
		dropboxWidth: '130px'
	},

	allowNewOption: {
		options: getOptions(8),
		allowNewOption: true
	},

	markMatchedLabel: {
		options: getOptions(8),
		search: true,
		markSearchResults: true
	},

	showingSelectedOption: {
		options: getOptions(8),
		multiple: true,
		search: true
	},

	aliasForSearching: {
		options: [
			{ label: 'Colors', value: 'colors', alias: 'Orange, Red' },
			{ label: 'Fruits', value: 'fruits', alias: ['Orange', 'Apple'] },
			{ label: 'Months', value: 'months', alias: 'January' },
			{ label: 'Others', value: 'others' }
		]
	},

	maximumValues: {
		options: getOptions(8),
		multiple: true,
		maxValues: 4
	},

	labelDescription: {
		options: getOptions(3),
		hasOptionDescription: true
	},

	showOptionOnlySearch: {
		options: getOptions(8),
		showOptionsOnlyOnSearch: true
	},

	select: {},

	sampleImage: {
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
	},

	popupMultiSelect: {
		zIndex: 9999,
		options: getOptions(10),
		dropboxWrapper: 'body',
		popupDropboxBreakpoint: '3000px',
		placeholder: 'Select multiple values',
		multiple: true
	},

	popupSingleSelect: {
		zIndex: 9999,
		options: getOptions(5),
		dropboxWrapper: 'body',
		popupDropboxBreakpoint: '3000px',
		placeholder: 'Select Single values',
		multiple: false
	},

	valueTag: {
		options: getOptions(5),
		dropboxWrapper: 'body',
		multiple: true,
		showValueAsTags: true
	}
});

// Function to generate options dynamically
function getOptions(count = 10, includeDesc = false) {
	const optionsData = [];
	for (let i = 1; i <= count; i += 1) {
		const optionData: any = { value: i, label: `Option ${i}` };
		if (includeDesc) optionData.description = `Description ${i}`;
		optionsData.push(optionData);
	}
	return optionsData;
}

function sampleLabelRenderer(data: { isCurrentNew: any; isNew: any; classNames: any; label: any }) {
	let prefix = '';
	/** skipping options those are added newly by allowNewOption feature */
	if (!data.isCurrentNew && !data.isNew)
		/** project developer has to add their own logic to create image/icon tag */
		prefix = `<i class="flag flag-${data.classNames} ltr:mr-2 rtl:ml-2"></i>`;
	return `${prefix}${data.label}`;
}
