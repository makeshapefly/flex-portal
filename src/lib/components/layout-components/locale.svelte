<script lang="ts">
	import { locale } from 'svelte-i18n';
	import Dropdown from '../ui/dropdown/Dropdown.svelte';
	import DropdownButton from '../ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '../ui/dropdown/DropdownMenu.svelte';
	import Simplebar from '../common/Simplebar.svelte';
	import DropdownItem from '../ui/dropdown/DropdownItem.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	interface Language {
		id: string;
		flag: string;
		name: string;
	}

	const languages: Record<string, Language> = {
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
	};

	$: flagImage = '';
	const updateLanguage = (key: string) => {
		if (browser) {
			localStorage.setItem('locale', key); // Save the selected language to localStorage
		}
		locale.set(key); // Set the new locale
		flagImage = languages[key].flag; // Update the flag image
	};

	onMount(() => {
		if (browser) {
			const currentLang = localStorage.getItem('locale') || 'en'; // Default to 'en'
			if (languages[currentLang]) {
				flagImage = languages[currentLang].flag; // Set the initial flag image
				locale.set(currentLang); // Set the initial locale
			}
		}
	});
</script>

<Dropdown alignTo="right" class="dropdown">
	<DropdownButton class="topbar-link">
		<img src={flagImage} alt="" class="size-6 rounded-md object-cover" />
	</DropdownButton>
	<DropdownMenu transition="scale-right" class="!fixed p-2">
		<Simplebar class="max-h-[calc(100vh_-_100px)]">
			{#each Object.entries(languages) as [key, value]}
				<DropdownItem img={value.flag} text={value.name} callback={() => updateLanguage(key)} />
			{/each}
		</Simplebar>
	</DropdownMenu>
</Dropdown>
