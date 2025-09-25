// src/i18n.js
import { addMessages, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import { browser } from '$app/environment';

import ar from '$lib/lang/ar.json';
import de from '$lib/lang/de.json';
import en from '$lib/lang/en.json';
import es from '$lib/lang/es.json';
import fr from '$lib/lang/fr.json';
import he from '$lib/lang/he.json';
import it from '$lib/lang/it.json';
import ko from '$lib/lang/ko.json';
import nl from '$lib/lang/nl.json';
import pt from '$lib/lang/pt.json';
import ru from '$lib/lang/ru.json';
import tr from '$lib/lang/tr.json';
import vi from '$lib/lang/vi.json';
import zh from '$lib/lang/zh.json';

addMessages('ar', ar);
addMessages('en', en);
addMessages('de', de);
addMessages('ko', ko);
addMessages('es', es);
addMessages('fr', fr);
addMessages('he', he);
addMessages('it', it);
addMessages('nl', nl);
addMessages('pt', pt);
addMessages('ru', ru);
addMessages('tr', tr);
addMessages('vi', vi);
addMessages('zh', zh);

let savedLocale: any = 'en'; // Default fallback locale
if (browser) {
  savedLocale = localStorage.getItem('currentLang') || getLocaleFromNavigator();
}
init({
  fallbackLocale: 'en', // Fallback locale if the current locale is not available
  initialLocale: savedLocale // Set the initial locale
});

if (browser) {
  locale.subscribe((value) => {
    if (value) {
      localStorage.setItem('currentLang', value);
    }
  });
}
