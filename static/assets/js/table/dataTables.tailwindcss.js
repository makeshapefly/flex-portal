/*! DataTables Tailwind CSS integration
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if (!$.fn.dataTable) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if (!root) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if (!$) {
					$ = jq(root);
				}

				cjsRequires(root, $);
				return factory($, root, root.document);
			};
		} else {
			cjsRequires(window, jq);
			module.exports = factory(jq, window, window.document);
		}
	}
	else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document) {
	'use strict';
	var DataTable = $.fn.dataTable;

	/*
	 * This is a tech preview of Tailwind CSS integration with DataTables.
	 */

	// Set the defaults for DataTables initialisation
	$.extend(true, DataTable.defaults, {
		renderer: 'tailwindcss'
	});


	// Default class modification
	$.extend(true, DataTable.ext.classes, {
		container: "dt-container dt-tailwindcss flex flex-col gap-5",
		search: {
			input: "form-input inline-block w-auto ltr:ml-2 rtl:mr-2"
		},
		length: {
			select: "form-select inline-block w-auto ltr:mr-2 rtl:ml-2"
		},
		processing: {
			container: "dt-processing"
		},
		paging: {
			active: 'active',
			button: 'pagination-item',
		},
		table: 'dataTable table whitespace-nowrap',
		thead: {
			cell: 'bg-gray-100 dark:bg-dark-850'
		},
		rowGroup: {
			start: "group bg-red-50 border-y",
			end: "group bg-gray-50 border-y"
		}
	});

	DataTable.ext.renderer.pagingButton.tailwindcss = function (settings, buttonType, content, active, disabled) {
		var classes = settings.oClasses.paging;
		var btnClasses = [classes.button];

		btnClasses.push(active ? classes.active : classes.notActive);
		btnClasses.push(disabled ? classes.notEnabled : classes.enabled);

		var a = $('<a>', {
			'href': disabled ? null : '#',
			'class': btnClasses.join(' ')
		})
			.html(content);

		return {
			display: a,
			clicker: a
		};
	};

	DataTable.ext.renderer.pagingContainer.tailwindcss = function (settings, buttonEls) {
		var classes = settings.oClasses.paging;

		buttonEls[0].addClass(classes.first);
		buttonEls[buttonEls.length - 1].addClass(classes.last);

		return $('<ul/>').addClass('pagination pagination-primary').append(buttonEls);
	};

	DataTable.ext.renderer.layout.tailwindcss = function (settings, container, items) {
		var row = $('<div/>', {
			"class": items.full ?
				'grid grid-cols-1 gap-4' :
				'grid grid-cols-1 md:grid-cols-2 gap-4'
		})
			.appendTo(container);

		$.each(items, function (key, val) {
			var className;

			// Apply start / end (left / right when ltr) margins
			if (val.table)
				className = 'col-span-2';
			else if (key === 'start')
				className = 'justify-self-center md:justify-self-start';
			else if (key === 'end')
				className = 'md:col-start-2 justify-self-center md:justify-self-end';
			else
				className = 'md:col-span-2 justify-self-center';

			$('<div/>', {
				id: val.id || null,
				"class": className + ' ' + (val.className || '')
			})
				.append(val.contents)
				.appendTo(row);
		});
	};
	return DataTable;
}));
