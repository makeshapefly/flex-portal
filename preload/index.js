import { generateMultipleFiles } from './preload-utils.js';
/**
 * Function to generate records and write to a destination file for multiple configurations.
 *
 * @param {Array} configs - Array of configuration objects containing:
 *   - {string} destinationPath - The file path where generated records will be written.
 *   - {string} variantName - The type definition name for variant (e.g., 'ProgressVariant').
 *   - {string} colorName - The type definition name for color (e.g., 'ProgressColors').
 *   - {string} exportName - The export variable name (e.g., 'fillClasses').
 *   - {string} recordKeyType - The type definition of key for records (e.g., 'UI.ProgressVariantColor').
 *   - {string} recordValueType - The type definition of value for records (e.g., 'string').
 *   - {Function} callback - Callback function that generates values based on variantColors.
 */
const configs = [
	{
		destinationPath: 'src/lib/components/ui/alert/alert-css.ts',
		variantName: 'AlertVariant',
		colorName: 'Colors',
		exportName: 'alretColors',
		recordKeyType: 'UI.AlertVariantColor',
		recordValueType: 'UI.AlertColorConfig',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
						acc[variantColor] = {
							containerClass: ` alert-${color}`,
							closeBtnClass: ` text-${color}-400 hover:text-${color}-500`
						};
						break;
					case 'soft':
						acc[variantColor] = {
							containerClass: ` alert-sub-${color}`,
							closeBtnClass: ` text-${color}-400 hover:text-${color}-500`
						};
						break;
					case 'solid':
						acc[variantColor] = {
							containerClass: ` alert-solid-${color}`,
							closeBtnClass: ` text-${color}-400 hover:text-${color}-500`
						};
						break;
					case 'outline':
						acc[variantColor] = {
							containerClass: ` alert-outline-${color}`,
							closeBtnClass: ` text-${color}-400 hover:text-${color}-500`
						};
						break;
					case 'gradient':
						acc[variantColor] = {
							containerClass: ` text-white border-none bg-gradient-to-r from-${color}-500 to-${color}-700`,
							closeBtnClass: ` text-${color}-400 hover:text-${color}-200`
						};
						break;
					case 'icon-info':
					case 'icon-success':
					case 'icon-warning':
					case 'icon-error': {
						acc[variantColor] = {
							iconClass: ` border-${color}-200 icon dark:border-${color}-500`,
							containerClass: ` alert-icon alert-${color}`,
							closeBtnClass: ` text-${color}-400 hover:text-${color}-500`
						};
						break;
					}

					case 'action-info':
					case 'action-success':
					case 'action-warning':
					case 'action-error':
						acc[variantColor] = {
							containerClass: ` border-t-${color}-500 dark:border-t-${color}-500`,
							closeBtnClass: ` link-${color}`,
							iconClass: ` text-${color}-500 fill-${color}-100 dark:fill-${color}-900`,
							iconContainerClass: ` border-${color}-500`,
							actionClass: ` btn-${color}`
						};
						break;

					case 'action-v2-info':
					case 'action-v2-success':
					case 'action-v2-warning':
					case 'action-v2-error':
						acc[variantColor] = {
							containerClass: ` bg-${color}-500`,
							iconContainerClass: ` bg-${color}-500`,
							actionClass: ` bg-${color}-500`
						};
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/accordion/accordion-css.ts',
		variantName: 'AccordionVarient',
		colorName: 'Colors',
		exportName: 'accordionColors',
		recordKeyType: 'UI.AccordionVariantColor',
		recordValueType: 'string',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
					case 'boxed':
						acc[variantColor] = ` accordion-${color}`;
						break;
					case 'solid':
					case 'solid-boxed':
						acc[variantColor] = ` accordion-solid-${color}`;
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}

				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/badge/badge-css.ts',
		variantName: 'BadgeVarient',
		colorName: 'Colors',
		exportName: 'badgeColors',
		recordKeyType: 'UI.BadgeVariantColor',
		recordValueType: 'string',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
						acc[variantColor] = `badge-${color}`;
						break;
					case 'soft':
						acc[variantColor] = `badge-sub-${color}`;
						break;
					case 'outline':
						acc[variantColor] = `badge-outline-${color}`;
						break;
					case 'solid':
						acc[variantColor] = `badge-solid-${color}`;
						break;
					case 'rounded':
						acc[variantColor] =
							`inline-block px-1.5 py-0.5 rounded-full text-11 border font-medium badge-${color}`;
						break;
					case 'rounded-outline':
						acc[variantColor] =
							`inline-block px-1.5 py-0.5 rounded-full text-11 border font-medium badge-outline-${color}`;
						break;
					case 'rounded-soft':
						acc[variantColor] =
							`inline-block px-1.5 py-0.5 rounded-full text-11 border font-medium badge-sub-${color}`;
						break;
					case 'rounded-solid':
						acc[variantColor] =
							`inline-block px-1.5 py-0.5 rounded-full text-11 border font-medium badge-solid-${color}`;
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/buttons/button-css.ts',
		variantName: 'ButtonVariant',
		colorName: 'ThemeColors',
		exportName: 'buttonColors',
		recordKeyType: 'UI.ButtonVariantColor',
		recordValueType: 'string',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
						acc[variantColor] =
							color !== 'light'
								? ` btn-${color}`
								: ` bg-transparent text-gray-500 border-gray-200 hover:bg-gray-200 hover:text-gray-500 hover:border-gray-200 focus:bg-gray-200 focus:text-gray-500 focus:border-gray-200`;
						break;
					case 'outline':
						acc[variantColor] =
							color !== 'light'
								? ` btn-outline-${color}`
								: ` bg-transparent text-gray-500 border-gray-200 hover:bg-gray-200 hover:text-gray-500 hover:border-gray-200 focus:bg-gray-200 focus:text-gray-500 focus:border-gray-200`;
						break;
					case 'soft':
						acc[variantColor] =
							color !== 'light'
								? ` btn-sub-${color}`
								: ` bg-transparent border-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:text-gray-500 focus:bg-gray-100`;
						break;
					case '3d':
						acc[variantColor] =
							color !== 'light'
								? ` btn-sub-${color}`
								: ` btn-3d-light bg-gray-100 text-gray-500 hover:bg-gray-100 focus:bg-gray-200`;
						break;
					case 'dashed':
						acc[variantColor] =
							color !== 'light'
								? ` btn-dashed-${color} border-dashed`
								: ` bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-500 hover:border-gray-200 focus:bg-gray-50 focus:text-gray-500 focus:border-gray-200 border-dashed`;
						break;
					case 'active':
						acc[variantColor] =
							color !== 'light'
								? ` btn-active-${color} border-dashed`
								: ` bg-transparent text-gray-500 border-gray-200 hover:bg-gray-200 hover:text-gray-500 hover:border-gray-200 focus:bg-gray-200 focus:text-gray-500 focus:border-gray-200`;
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/navigation/nav-link-css.ts',
		variantName: 'NavLinkVarient',
		colorName: 'Colors',
		exportName: 'navlinkColors',
		recordKeyType: 'UI.NavLinkVarientColor',
		recordValueType: 'string',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
						acc[variantColor] = ` navigation-${color}`;
						break;
					case 'animation':
						acc[variantColor] = ` navigation-animation-${color}`;
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/loader/loader-css.ts',
		variantName: 'LoaderAnimations',
		colorName: 'ThemeColors',
		exportName: 'loaderColors',
		recordKeyType: 'UI.LoaderAnimationsColor',
		recordValueType: 'string',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);

				switch (variant) {
					case 'spin':
						acc[variantColor] = ` loader-spin loader-${color}`;
						break;
					case 'spin-2':
						acc[variantColor] = ` modern-spin loader-${color}`;
						break;
					case 'bounce':
						acc[variantColor] = ` animate-bounce loader-${color}`;
						break;
					case 'ping':
						acc[variantColor] = ` animate-ping rounded-full loader-${color}`;
						break;
					case 'pulse':
						acc[variantColor] = ` animate-pulse loader-${color}`;
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor} ${color}`);
				}
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/tab/tab-css.ts',
		variantName: 'TabVarient',
		colorName: 'Colors',
		exportName: 'tabColors',
		recordKeyType: 'UI.TabVareintColor',
		recordValueType: 'UI.TabColorConfig',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
						acc[variantColor] = {
							tabClasses: ` tabs`,
							tabItemClasses: ` [&.active]:after:opacity-100 [&.active]:after:w-full [&.active]:text-${color}-500`
						};
						break;
					case 'justify':
						acc[variantColor] = {
							tabClasses: ` tabs *:grow`,
							tabItemClasses: ` [&.active]:after:opacity-100 [&.active]:after:w-full [&.active]:text-${color}-500`
						};
						break;
					case 'pills':
						acc[variantColor] = {
							tabClasses: ` tabs-pills *:grow`,
							tabItemClasses: ` [&.active]:bg-${color}-500 [&.active]:text-${color}-50`
						};
						break;
					case 'pills-justify':
						acc[variantColor] = {
							tabClasses: ` tabs-pills`,
							tabItemClasses: ` [&.active]:bg-${color}-500 [&.active]:text-${color}-50`
						};
						break;
					case 'icon':
						acc[variantColor] = {
							tabClasses: ` tabs-pills tabs-icon`,
							tabItemClasses: ` [&.active]:bg-${color}-500 [&.active]:text-${color}-50 group/item`
						};
						break;
					case 'icon-text':
						acc[variantColor] = {
							tabClasses: ` tabs-pills tabs-icon`,
							tabItemClasses: ` [&.active]:bg-${color}-500 [&.active]:text-${color}-50`
						};
						break;
					case 'animation':
						acc[variantColor] = {
							tabClasses: ` tabs-pills tabs-icon`,
							tabItemClasses: ` group/item [&.active]:bg-${color}-500 [&.active]:text-${color}-50`
						};
						break;

					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				acc[variantColor].inactiveClasses =
					` text-gray-500 hover:text-${color}-500 dark:text-dark-500 dark:hover:text-${color}-500`;
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/progress-bar/progress-bar-css.ts',
		variantName: 'ProgressVariant',
		colorName: 'ThemeColors',
		exportName: 'progressColors',
		recordKeyType: 'UI.ProgressVariantColor',
		recordValueType: 'string',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'default':
						acc[variantColor] = ` bg-${color}`;
						break;
					case 'soft':
						acc[variantColor] = ` bg-sub-${color}`;
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				return acc;
			}, {});
		}
	},
	{
		destinationPath: 'src/lib/components/ui/pagination/pagination-css.ts',
		variantName: 'PaginationVariant',
		colorName: 'Colors',
		exportName: 'paginationColors',
		recordKeyType: 'UI.PaginationColorVariant',
		recordValueType: 'UI.PaginationColorConfig',
		callback: (variantColors) => {
			return variantColors.reduce((acc, variantColor) => {
				const [variant, color] = variantColor.split(/-(?=[^-]+$)/);
				switch (variant) {
					case 'basic':
						acc[variantColor] = {
							containerClass: `pagination-${color}`,
							preBtnClass: 'pagination-pre',
							nextBtnClass: 'pagination-next'
						};
						break;
					case 'basic-rounded':
						acc[variantColor] = {
							containerClass: `pagination-${color}`,
							preBtnClass: 'pagination-pre',
							nextBtnClass: 'pagination-next',
							btnClass: '!rounded-full'
						};
						break;
					case 'flush':
						acc[variantColor] = {
							containerClass: `pagination-${color} pagination-flush`
						};
						break;
					case 'flush-rounded':
						acc[variantColor] = {
							containerClass: `pagination-${color} pagination-flush`,
							preBtnClass: 'pagination-pre',
							nextBtnClass: 'pagination-next',
							btnClass: '!rounded-full'
						};
						break;
					case 'modern':
						acc[variantColor] = {
							containerClass: `border-${color}-500 bg-${color}-500 rounded-md`,
							btnClass: `border-${color}-200/20 bg-${color}-500 text-${color}-200 disabled:text-${color}-300`
						};
						break;
					case 'modern-rounded':
						acc[variantColor] = {
							containerClass: `border-${color}-500 bg-${color}-500 rounded-full`,
							btnClass: `border-${color}-200/20 bg-${color}-500 text-${color}-200 disabled:text-${color}-300`
						};
						break;
					default:
						throw new Error(`Unknown variant: ${variant} in ${variantColor}`);
				}
				return acc;
			}, {});
		}
	},
];
generateMultipleFiles(configs);
