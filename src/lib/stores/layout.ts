import { get, type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';
import LocalStorage from '../utils/LocalStorage';

const userSettings: UI.ILayoutSettings = {
	layoutMode: 'default',
	navType: 'default',
	contentWidth: 'default',
	layoutTheme: 'light',
	sidebarSize: 'default',
	sidebarColor: 'light',
	layoutDir: 'ltr',
	primaryColor: 'default',
	darkModeColor: '',
	backdrop: null,
	sidebarMainDiv: null,
	scrollableDiv: null,
	languageData: {},
	// language translation data
	languages: {
		en: { id: 'us', flag: '/assets/images/flag/us.svg', name: 'English' },
		es: { id: 'es', flag: '/assets/images/flag/es.svg', name: 'Spanish' },
		fr: { id: 'fr', flag: '/assets/images/flag/fr.svg', name: 'French' },
		ru: { id: 'ru', flag: '/assets/images/flag/ru.svg', name: 'Russian' },
		de: { id: 'de', flag: '/assets/images/flag/de.svg', name: 'German' },
		it: { id: 'it', flag: '/assets/images/flag/it.svg', name: 'Italian' },
		zh: { id: 'cn', flag: '/assets/images/flag/cn.svg', name: 'Chinese' },
		ar: { id: 'sa', flag: '/assets/images/flag/sa.svg', name: 'Arabic' },
		tr: { id: 'tr', flag: '/assets/images/flag/tr.svg', name: 'Turkish' },
		he: { id: 'il', flag: '/assets/images/flag/il.svg', name: 'Hebrew' },
		vi: { id: 'vn', flag: '/assets/images/flag/vn.svg', name: 'Vietnamese' },
		nl: { id: 'nl', flag: '/assets/images/flag/nl.svg', name: 'Dutch' },
		ko: { id: 'kr', flag: '/assets/images/flag/kr.svg', name: 'Korean' },
		pt: { id: 'pt', flag: '/assets/images/flag/pt.svg', name: 'Portuguese' }
	},
	currentLang: 'en'
};
function initLayout(): UI.ILayoutSettings {
	if (!browser) return userSettings;
	return {
		layoutMode: (LocalStorage.getItem('layoutMode') as UI.LayoutMode) ?? userSettings.layoutMode,
		navType: (LocalStorage.getItem('navType') as UI.NavType) ?? userSettings.navType,
		contentWidth:
			(LocalStorage.getItem('contentWidth') as UI.ContentWidth) ?? userSettings.contentWidth,
		layoutTheme:
			(LocalStorage.getItem('layoutTheme') as UI.LayoutTheme) ?? userSettings.layoutTheme,
		sidebarSize:
			(LocalStorage.getItem('sidebarSize') as UI.SidebarSize) ?? userSettings.sidebarSize,
		sidebarColor:
			(LocalStorage.getItem('sidebarColor') as UI.SidebarColors) ?? userSettings.sidebarColor,
		layoutDir: (LocalStorage.getItem('layoutDir') as UI.LayoutDir) ?? userSettings.layoutDir,
		primaryColor:
			(LocalStorage.getItem('primaryColor') as UI.PrimaryColors) ?? userSettings.primaryColor,
		darkModeColor:
			(LocalStorage.getItem('darkModeColor') as UI.DarkModeColors) ?? userSettings.darkModeColor,
		backdrop: document.getElementById('backdrop') ?? null,
		sidebarMainDiv: document.getElementById('main-sidebarSize') ?? null,
		scrollableDiv:
			document.getElementById('main-sidebarSize')?.querySelector('.simplebar-content-wrapper') ??
			null,
		currentLang: localStorage.getItem('language') || 'en', // Default language
		languages: userSettings.languages,
		languageData: userSettings.languageData
	};
}

export const layoutStore: Writable<UI.ILayoutSettings> = writable(initLayout());

export function toggleSidebar(isResize = false): void {
	if (!browser) throw new Error('This function(toggleSidebar) is only available in the browser');
	const isSmallScreen = window.innerWidth < 1024;
	const backdrop = document.getElementById('backdrop');
	const sidebarMainDiv = document.getElementById('main-sidebar');
	if (isResize && backdrop && sidebarMainDiv) {
		backdrop.classList.toggle('hidden', isSmallScreen);
		sidebarMainDiv.classList.toggle('hidden', isSmallScreen);
	} else {
		if (isSmallScreen && backdrop && sidebarMainDiv) {
			const isHidden = backdrop.classList.contains('hidden');
			backdrop.classList.toggle('hidden', !isHidden);
			sidebarMainDiv.classList.toggle('hidden', !isHidden);
		} else {
			layoutStore.update((lt) => {
				const newLayout = lt.sidebarSize === 'small' ? 'default' : 'small';
				document.documentElement.setAttribute('data-sidebar', newLayout);
				LocalStorage.setItem('sidebarSize', newLayout);
				lt.sidebarSize = newLayout;
				return lt;
			});
		}
	}
}

export function updateAttributes(isResize = false): void {
	const documentElement = document.documentElement;
	const {
		layoutMode,
		navType,
		contentWidth,
		layoutTheme,
		sidebarSize,
		sidebarColor,
		layoutDir,
		primaryColor,
		darkModeColor,
		scrollableDiv,
		currentLang
	} = get(layoutStore);

	documentElement.setAttribute('lang', currentLang);
	documentElement.setAttribute('data-layout', layoutMode);
	documentElement.setAttribute('data-content-width', contentWidth);
	if (layoutTheme === 'auto') {
		const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const isDarkMode = colorSchemeMediaQuery.matches;
		if (isDarkMode) {
			documentElement.setAttribute('data-mode', 'dark');
		} else {
			documentElement.setAttribute('data-mode', 'light');
		}
	} else {
		documentElement.setAttribute('data-mode', layoutTheme);
	}
	documentElement.setAttribute('data-sidebar-colors', sidebarColor);
	sidebarSize
		? documentElement.setAttribute('data-sidebar', sidebarSize)
		: documentElement.removeAttribute('data-sidebar');
	navType
		? documentElement.setAttribute('data-nav-type', navType)
		: documentElement.removeAttribute('data-nav-type');
	documentElement.setAttribute('dir', layoutDir);
	documentElement.setAttribute('data-colors', primaryColor);
	if (darkModeColor) {
		const element = document.documentElement;
		const darkModeClasses = ['neutral', 'gray', 'stone', 'zinc', 'default'];
		element.classList.remove(...darkModeClasses);
		documentElement.classList.add(darkModeColor);
	}
	// if(scrollableDiv) scrollableDiv.addEventListener('wheel', (e) => { handleMenuScroll(e, this) });

	// Save settings to localStorage
	LocalStorage.setItem('layoutMode', layoutMode);
	LocalStorage.setItem('navType', navType);
	LocalStorage.setItem('contentWidth', contentWidth);
	LocalStorage.setItem('layoutTheme', layoutTheme);
	LocalStorage.setItem('sidebarSize', sidebarSize);
	LocalStorage.setItem('layoutDir', layoutDir);
	LocalStorage.setItem('primaryColor', primaryColor);
	LocalStorage.setItem('currentLang', currentLang);
	if (isResize) {
		setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
	}
}

export function setLayoutTheme(newLayoutTheme: UI.LayoutTheme): void {
	layoutStore.update((lt) => {
		LocalStorage.setItem('layoutTheme', newLayoutTheme);
		lt.layoutTheme = newLayoutTheme;
		return lt;
	});
	updateAttributes(true);
}

export function setLayoutMode(newLayoutMode: UI.LayoutMode): void {
	layoutStore.update((lt) => {
		// If the new layout mode is horizontal, reset navType to 'default'
		if (newLayoutMode === 'horizontal') {
			lt.navType = 'default';
			lt.sidebarSize = 'default';
			LocalStorage.setItem('navType', 'default');
		}

		LocalStorage.setItem('layoutMode', newLayoutMode);
		lt.layoutMode = newLayoutMode;
		return lt;
	});
	updateAttributes(true);
}

export function setNavigation(newNavType: UI.NavType) {
	layoutStore.update((lt) => {
		const updatedLayout = { ...lt, navType: newNavType };
		LocalStorage.setItem('navType', newNavType);
		return updatedLayout;
	});
	updateAttributes(true);
}

export function setContentWidth(newContentWidth: UI.ContentWidth) {
	layoutStore.update((lt) => {
		const updatedLayout = { ...lt, contentWidth: newContentWidth };
		LocalStorage.setItem('contentWidth', newContentWidth);
		return updatedLayout;
	});
	updateAttributes(true);
}

export function setLayoutDir(newLayoutDir: UI.LayoutDir): void {
	layoutStore.update((lt) => {
		LocalStorage.setItem('layoutTheme', newLayoutDir);
		lt.layoutDir = newLayoutDir;
		return lt;
	});
	updateAttributes(true);
}

export function setSidebarSize(newSidebarSize: UI.SidebarSize) {
	layoutStore.update((lt) => {
		const updatedLayout = { ...lt, sidebarSize: newSidebarSize };
		LocalStorage.setItem('sidebarSize', newSidebarSize);
		return updatedLayout;
	});
	updateAttributes(true);
}

export function setDarkModeColor(newDarkModeColor: UI.DarkModeColors) {
	layoutStore.update((lt) => {
		const updatedLayout = { ...lt, darkModeColor: newDarkModeColor };
		LocalStorage.setItem('darkModeColor', newDarkModeColor);
		return updatedLayout;
	});
	updateAttributes(true);
}

export function setSidebarColor(newSidebarColor: UI.SidebarColors) {
	layoutStore.update((lt) => {
		const updatedLayout = { ...lt, sidebarColor: newSidebarColor };
		LocalStorage.setItem('sidebarColor', newSidebarColor);
		return updatedLayout;
	});
	updateAttributes(true);
}

export function setPrimaryColors(newPrimaryColors: UI.PrimaryColors) {
	layoutStore.update((lt) => {
		const updatedLayout = { ...lt, primaryColors: newPrimaryColors };
		LocalStorage.setItem('primaryColors', newPrimaryColors);
		return updatedLayout;
	});
	updateAttributes(true);
}

export function updateLanguage(lang: string) {
	layoutStore.update((lt) => {
		if (lang !== lt.currentLang) {
			lt.currentLang = lang;
			LocalStorage.setItem('currentLang', lang);
		}
		return lt;
	});
}

export function getFlag() {
	const ltStore = get(layoutStore);
	const flag = ltStore.languages[ltStore.currentLang].flag;
	if (flag) return flag;
	return ltStore.languages['en'].flag;
}

export function resetAttributes() {
	// Reset layout settings to default values
	layoutStore.update((lt) => {
		const defaultSettings: UI.ILayoutSettings = {
			layoutMode: 'default',
			navType: 'default',
			contentWidth: 'default',
			layoutTheme: 'auto',
			sidebarSize: 'default',
			sidebarColor: 'light',
			layoutDir: 'ltr',
			primaryColor: 'default',
			darkModeColor: '',
			backdrop: null,
			sidebarMainDiv: null,
			scrollableDiv: null,
			currentLang: 'en',
			languages: lt.languages, // Keep languages unchanged
			languageData: lt.languageData // Keep languageData unchanged
		};

		// Update store with default values
		LocalStorage.setItem('layoutMode', defaultSettings.layoutMode);
		LocalStorage.setItem('navType', defaultSettings.navType);
		LocalStorage.setItem('contentWidth', defaultSettings.contentWidth);
		LocalStorage.setItem('layoutTheme', defaultSettings.layoutTheme);
		LocalStorage.setItem('sidebarSize', defaultSettings.sidebarSize);
		LocalStorage.setItem('sidebarColor', defaultSettings.sidebarColor);
		LocalStorage.setItem('layoutDir', defaultSettings.layoutDir);
		LocalStorage.setItem('primaryColor', defaultSettings.primaryColor);
		LocalStorage.setItem('darkModeColor', defaultSettings.darkModeColor);
		LocalStorage.setItem('currentLang', defaultSettings.currentLang);

		// Return updated layout settings
		return { ...lt, ...defaultSettings };
	});

	// Update the attributes on the document
	updateAttributes(true);
}
